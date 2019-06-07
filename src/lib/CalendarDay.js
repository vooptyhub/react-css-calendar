import React, {Component, Fragment} from 'react'
import {times} from 'lodash'
import {groupByOverlap, gridTemplateRows} from './Calendar'
import {tenMinutes, hoursInDay, minutesInHour} from './Constants'
import {withStyles} from './styles'

const toGridRow = (from, to) => (from + 1) + '/' + (to + 1);
const toMinutes = (hours) => (hours * minutesInHour) / tenMinutes;
export const CalendarDay = withStyles(({
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
        separator: {
            backgroundColor: ({colorScheme: {divider}}) => divider,
            height: 1,
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
        },
        hour: {
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gridColumn: `1 / span 1`,
            '&:hover': {
                backgroundColor: ({colorScheme: {hover}}) => hover,
            }
        }
    }
))(
    class extends Component {

        HoursGrid = () => {
            const {classes, date, onTimeSlotClick} = this.props;

            return (
                <Fragment>
                    {
                        times(hoursInDay, hour => (
                            <div key={hour}
                                 onClick={() => onTimeSlotClick(date.clone().hour(hour))}
                                 className={classes.hour}
                                 style={{gridRow: `${hour + 1} / span 1`}}>
                                <div className={classes.separator}/>
                            </div>
                        ))
                    }
                </Fragment>
            )
        };

        render() {
            const {classes, events: allEvents, date, renderEvent, style} = this.props;
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
                                         zIndex: 2,
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
