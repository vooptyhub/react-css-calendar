import React from 'react';
import {compose, setPropTypes, withProps, withStateHandlers, defaultProps, lifecycle, pure} from 'recompose'
import PropTypes from "prop-types";
import moment from 'moment'
import {withStyles} from './styles'
import {colorScheme, daysInWeek} from './Constants'
import _ from 'lodash'

const monthRange = function* (start, end) {
    let current = moment(start);

    while (current.isBefore(end)) {
        yield moment(current);
        current = current.add(1, 'day')
    }
};

const generateDays = withProps(({month}) => ({
    days: [...monthRange(
        moment(month).startOf('month').startOf('week').add(1, 'day'),
        moment(month).endOf('month').startOf('week').add(8, 'days'),
    )],
}));

const automaticMonthChange = lifecycle({
    componentWillReceiveProps(newProps) {
        const newMonth = newProps.month;
        const {month, setMonth} = this.props;

        if (!newMonth.isSame(month)) {
            setMonth(newMonth)
        }
    },
});

const defaultNavButton = (text) => ({onClick}) => (<button onClick={onClick}>{text}</button>);

const daySize = 30;

export const CalendarDayPicker = compose(
    setPropTypes({
        date: PropTypes.object,
        onDateChange: PropTypes.func,
        renderMonth: PropTypes.func,
        renderDayOfWeek: PropTypes.func,
        renderDayOfMonth: PropTypes.func,
        NextMonthButton: PropTypes.elementType,
        PreviousMonthButton: PropTypes.elementType,
    }),
    defaultProps({
        onDateChange: () => {
        },
        renderMonth: (month) => month.format('MMMM YYYY'),
        renderDayOfWeek: (day) => day.format('ddd'),
        renderDayOfMonth: (day, date) => (<div
            style={day.isSame(date, 'day') ? {fontWeight: 'bold'} : (day.isBefore(moment(date).startOf('month')) ? {color: colorScheme.divider} : {})}>{day.format('D')}</div>),
        NextMonthButton: defaultNavButton('>'),
        PreviousMonthButton: defaultNavButton('<'),
    }),
    pure,
    withProps((({date}) => ({
        date: (date ? moment(date) : moment()).startOf('day')
    }))),
    withStateHandlers(({date}) => ({
        month: moment(date).startOf('month'),
    }), {
        setMonth: () => month => ({month}),
        nextMonth: ({month}) => () => ({month: moment(month).add(1, 'month')}),
        prevMonth: ({month}) => () => ({month: moment(month).subtract(1, 'month')}),
    }),
    generateDays,
    automaticMonthChange,
    withStyles({
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
        },
        navigation: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        day: {
            cursor: 'pointer',
            width: daySize,
            height: daySize,
            borderRadius: daySize,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    }),
)(
    ({
         classes,
         days,
         month,
         date,
         nextMonth,
         prevMonth,
         onDateChange,
         renderMonth,
         renderDayOfWeek,
         renderDayOfMonth,
         NextMonthButton,
         PreviousMonthButton
     }) => {
        const startOfThisWeek = moment(date).startOf('week');
        return (
            <div>
                <div className={classes.navigation}>
                    <PreviousMonthButton onClick={prevMonth}/>
                    <div>{renderMonth(month)}</div>
                    <NextMonthButton onClick={nextMonth}/>
                </div>
                <div className={classes.grid}>
                    {_.times(daysInWeek, (i) => (
                        <div key={i}>{renderDayOfWeek(startOfThisWeek.add(i, 'day'))}</div>
                    ))}
                    {days.map((day, i) => (
                        <div key={i} onClick={() => onDateChange(day)}
                             className={classes.day}>
                            {renderDayOfMonth(day, date)}
                        </div>
                    ))}
                </div>
            </div>
        )
    });
