import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    hoursInDay,
    minutesInHour,
    tenMinutes
} from './Constants'
import {gridTemplateRows} from './Calendar'
import {CalendarColumn} from './CalendarColumn'
import {withDefaultSettings, withStyles} from './styles'
import {GridHeader} from './GridHeader'
import moment from 'moment'
import {compose} from 'recompose'
import {times} from "lodash";

export const CalendarGrid = compose(
    withDefaultSettings,
    withStyles(({
        root: {
            borderLeft: ({colorScheme: {divider}}) => `1px solid ${divider}`,
            borderTop: ({colorScheme: {divider}}) => `1px solid ${divider}`,
            backgroundColor: ({colorScheme: {header}}) => header,
            overflowX: 'hidden',
            flex: "1 0 0%",
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
        },
        events: {
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            overflow: 'auto',
        },
        sideline: {
            borderRight: ({colorScheme: {divider}}) => `1px solid ${divider}`,
            borderBottom: ({colorScheme: {divider}}) => `1px solid ${divider}`,
            display: 'flex',
            justifyContent: 'center'
        },
        grid: {
            flex: '1 0 0%',
            display: 'grid',
            gridTemplateColumns: ({columns, dimensions: {timeLineWidth}}) => `${timeLineWidth}px repeat(${columns.length}, 1fr)`,
            gridTemplateRows: ({startHour, endHour, dimensions: {tenMinutesHeight}}) =>
                gridTemplateRows(hoursInDay, startHour, endHour, `${tenMinutesHeight * (minutesInHour / tenMinutes)}px`),
            gridRowGap: 0,
            gridColumnGap: 0,
        },
    })))(
    class extends Component {
        static propTypes = {
            ...CalendarColumn.propTypes,
            getColumnEvents: PropTypes.func.isRequired,
            getColumnDate: PropTypes.func.isRequired,
            columns: PropTypes.array.isRequired,
            renderColumnName: PropTypes.func.isRequired,
            renderTime: PropTypes.func.isRequired,
        };

        static defaultProps = {
            ...CalendarColumn.defaultProps,
            getColumnEvents: (date, {events}) => (events.filter(({start, end}) =>
                moment(start).isSameOrBefore(date, 'day') &&
                moment(end).isSameOrAfter(date, 'day')
            )),
            getColumnDate: (date) => date,
            columns: [moment.utc()],
            renderTime: (date) => date.format('LT'),
            renderColumnName: (date) => date.format('D MMM'),
        };

        render() {
            const {classes, columns, endHour, startHour, renderTime, getColumnEvents, getColumnDate, onTimeSlotClick, ...rest} = this.props;

            return (
                <div className={classes.root}>
                    <GridHeader columns={columns} {...rest}/>
                    <div className={classes.events}>
                        <div className={classes.grid}>
                            {times(endHour - startHour, t => {
                                const hour = t + startHour;
                                return (
                                    <div key={hour}
                                         className={classes.sideline}
                                         style={{
                                             gridColumn: '1 / 2',
                                             gridRow: `${hour + 1} / ${hour + 2}`,
                                         }}>
                                        {renderTime(moment({hour}))}
                                    </div>
                                )
                            })}
                            {columns.map((column, index) => <CalendarColumn {...rest}
                                                                            key={index}
                                                                            style={{
                                                                                gridRow: `1 /${hoursInDay + 1}`,
                                                                                gridColumn: `${index + 2} /${index + 3}`,
                                                                            }}
                                                                            onTimeSlotClick={onTimeSlotClick}
                                                                            startHour={startHour}
                                                                            endHour={endHour}
                                                                            date={getColumnDate(column)}
                                                                            events={getColumnEvents(column, this.props)}/>)}
                        </div>
                    </div>
                </div>
            )
        }
    });