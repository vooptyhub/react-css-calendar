import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {
    hoursInDay,
    divider,
    header,
    dimensions,
    colorScheme,
    minutesInHour,
    tenMinutes
} from './Constants'
import {gridTemplateRows} from './Calendar'
import {CalendarDay} from './CalendarDay'
import {withStyles} from './styles'
import {GridHeader} from './GridHeader'
import {times} from 'lodash'
import moment from 'moment'

export const CalendarGrid = withStyles(({
    root: {
        borderLeft: `1px solid ${divider}`,
        borderTop: `1px solid ${divider}`,
        backgroundColor: header,
        overflowX: 'hidden',
        flex: "1 0 0%",
        display: 'flex',
        flexDirection: 'column'
    },
    grid: {
        flex: '1 0 0%',
        display: 'grid',
        gridTemplateColumns: ({dates, dimensions: {timeLineWidth}}) => `${timeLineWidth}px repeat(${dates.length}, 1fr)`,
        gridTemplateRows: ({startHour, endHour, dimensions: {tenMinutesHeight}}) =>
            gridTemplateRows(hoursInDay, startHour, endHour, `${tenMinutesHeight * (minutesInHour / tenMinutes)}px`),
        gridRowGap: 0,
        gridColumnGap: 0,
    },
    sideline: {
        borderRight: `1px solid ${divider}`,
        borderBottom: `1px solid ${divider}`,
        display: 'flex',
        justifyContent: 'center'
    },
}))(
    class extends Component {
        static propTypes = {
            startHour: PropTypes.number.isRequired,
            endHour: PropTypes.number.isRequired,
            dates: PropTypes.array.isRequired,
            events: PropTypes.array.isRequired,
            renderDate: PropTypes.func.isRequired,
            renderTime: PropTypes.func.isRequired,
            renderEvent: PropTypes.func.isRequired,
            dimensions: PropTypes.object.isRequired,
            colorScheme: PropTypes.object.isRequired,
            onTimeSlotClick: PropTypes.func
        };
        static defaultProps = {
            startHour: 0,
            endHour: 24,
            dates: [moment.utc()],
            events: [],
            renderEvent: (event) => JSON.stringify(event),
            renderDate: (hour) => moment({hour}).format('LT'),
            renderTime: (date) => date.format('D MMM'),
            dimensions,
            colorScheme
        };

        getDateEvents(date) {
            return this.props.events.filter(({start, end}) =>
                moment(start).isSameOrBefore(date, 'day') &&
                moment(end).isSameOrAfter(date, 'day')
            )
        }

        CalendarHourGrid = () => {
            const {classes, startHour, endHour, renderDate} = this.props;

            return times(endHour - startHour, t => {
                const hour = t + startHour;
                return (
                    <Fragment key={hour}>
                        <div
                            className={classes.sideline}
                            style={{
                                gridColumn: '1 / 2',
                                gridRow: `${hour + 1} / ${hour + 2}`,
                            }}>
                            {renderDate(hour)}
                        </div>
                    </Fragment>
                )
            })
        };

        render() {
            const {classes, dates, ...rest} = this.props;
            const {CalendarHourGrid} = this;

            return (
                <div className={classes.root}>
                    <GridHeader dates={dates} {...rest}/>
                    <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                        <div className={classes.grid}>
                            <CalendarHourGrid/>
                            {dates.map((date, index) => (
                                <CalendarDay key={index}
                                             date={date}
                                             style={{
                                                 gridRow: `1 /${hoursInDay + 1}`,
                                                 gridColumn: `${index + 2} /${index + 3}`,
                                             }}
                                             {...rest}
                                             events={this.getDateEvents(date)}/>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
    });
