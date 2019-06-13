import React, {Component, Fragment} from 'react'
import {times} from 'lodash'
import {groupByOverlap, gridTemplateRows} from './Calendar'
import {
    tenMinutes,
    hoursInDay,
    minutesInHour,
} from './Constants'
import {withDefaultSettings, withStyles} from './styles'
import PropTypes from "prop-types";
import moment from "moment";
import {compose} from 'recompose'

const toGridRow = (from, to) => (from + 1) + '/' + (to + 1);
const toMinutes = (hours) => (hours * minutesInHour) / tenMinutes;
export const CalendarColumn = compose(
    withDefaultSettings,
    withStyles(({
            root: {
                borderRight: ({colorScheme: {divider}}) => `1px solid ${divider}`,
                backgroundColor: ({colorScheme: {background}}) => background,
                display: 'grid',
                overflow: 'hidden',
                gridTemplateRows: ({startHour, endHour}) => gridTemplateRows(hoursInDay, startHour, endHour, '1fr'),
            },
            timegrid: {
                display: 'grid',
                gridTemplateRows: ({startHour, endHour, dimensions: {tenMinutesHeight}}) =>
                    gridTemplateRows(toMinutes(hoursInDay), toMinutes(startHour), toMinutes(endHour), `${tenMinutesHeight}px`),
                padding: 0,
                gridColumn: '1 / span 1',
                gridRow: '1 / span 24',
            },
            event: {
                border: ({colorScheme: {divider}}) => `1px solid ${divider}`,
                minWidth: 0,
                minHeight: 0,
                overflow: 'hidden',
                wordBreak: 'break-all',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: ({colorScheme: {hover}}) => hover,
                userSelect: 'none',
                zIndex: 2,
            },
            hour: {
                display: 'grid',
                gridColumn: `1 / span 1`,
                gridTemplateRows: `repeat(${minutesInHour / tenMinutes}, 1fr)`,
            },
            tenMinutes: {
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                opacity: 0.5,
                '&:last-child': {
                    opacity: 1,
                },
                '&:hover': {
                    backgroundColor: ({colorScheme: {hover}}) => hover,
                },
            },
            separator: {
                backgroundColor: ({colorScheme: {divider}}) => divider,
                height: 1,
            }
        }
    ))
)(
    class extends Component {
        static propTypes = {
            startHour: PropTypes.number.isRequired,
            endHour: PropTypes.number.isRequired,
            date: PropTypes.object.isRequired,
            events: PropTypes.array.isRequired,
            renderEvent: PropTypes.func.isRequired,
            dimensions: PropTypes.object.isRequired,
            colorScheme: PropTypes.object.isRequired,
            onTimeSlotClick: PropTypes.func
        };

        static defaultProps = {
            startHour: 0,
            endHour: 24,
            date: moment.utc(),
            events: [],
            renderEvent: (event) => event.title,
        };

        HoursGrid = () => {
            const {classes, date, startHour, endHour, onTimeSlotClick} = this.props;

            return (
                <Fragment>
                    {
                        times(hoursInDay, hour => (
                            <div key={hour}
                                 className={classes.hour}
                                 style={{gridRow: `${hour + 1} / span 1`}}>
                                {hour >= startHour && hour <= endHour && times(minutesInHour / tenMinutes, minutes => (
                                    <div className={classes.tenMinutes}
                                         key={minutes}
                                         style={{gridRow: `${minutes + 1} / span 1`}}
                                         onClick={() => onTimeSlotClick(date.clone().hour(hour).minutes(minutes * tenMinutes))}>
                                        <div className={classes.separator}/>
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </Fragment>
            )
        };

        render() {
            const {classes, events: allEvents, date, renderEvent, style, dimensions} = this.props;
            const {HoursGrid} = this;

            const groupedEvents = groupByOverlap(allEvents, date);

            return (
                <div className={classes.root} style={style}>
                    <HoursGrid/>
                    <div className={classes.timegrid}>
                        {groupedEvents.map(({startRow, endRow, events}, i) => {
                            return (
                                <div key={i}
                                     style={{
                                         display: 'grid',
                                         gridTemplateRows: `repeat(${endRow - startRow}, 1fr)`,
                                         gridRow: toGridRow(startRow, endRow),
                                         margin: dimensions.groupedEventsMargin
                                     }}>
                                    {events.map((event, i) => (
                                        <div key={i}
                                             className={classes.event}
                                             style={{
                                                 gridRow: toGridRow(event.startRow - startRow, event.endRow - startRow),
                                             }}>
                                            {renderEvent(event, i)}
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    });
