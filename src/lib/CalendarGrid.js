import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {hoursInDay, tenMinutesHeight, timeLineWidth, divider, header} from './Constants'
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
        gridTemplateColumns: ({dates}) => `${timeLineWidth}px repeat(${dates.length}, 1fr)`,
        gridTemplateRows: ({startHour, endHour}) => gridTemplateRows(hoursInDay, startHour, endHour, `${tenMinutesHeight * 6}px`),
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
            renderRowTitleCell: PropTypes.func.isRequired,
            renderColumnTitleCell: PropTypes.func.isRequired,
            renderEvent: PropTypes.func.isRequired
        };
        static defaultProps = {
            startHour: 0,
            endHour: 24,
            dates: [moment.utc()],
            events: [],
            renderEvent: (event) => JSON.stringify(event),
            renderRowTitleCell: (hour) => (hour),
            renderColumnTitleCell: (date) => date.format()
        }

        getDateEvents(date) {
            return this.props.events.filter(({start, end}) =>
                moment(start).isSameOrBefore(date, 'day') &&
                moment(end).isSameOrAfter(date, 'day')
            )
        }

        CalendarHourGrid = () => {
            const {classes, startHour, endHour, renderRowTitleCell} = this.props;

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
                            {renderRowTitleCell(hour)}
                        </div>
                    </Fragment>
                )
            })
        };

        render() {
            const {classes, dates, startHour, endHour, onHourClicked, renderColumnTitleCell, renderEvent} = this.props;
            const {CalendarHourGrid} = this;

            return (
                <div className={classes.root}>
                    <GridHeader renderColumnTitleCell={renderColumnTitleCell}
                                dates={dates}/>
                    <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                        <div className={classes.grid}>
                            <CalendarHourGrid/>
                            {dates.map((date, index) => (
                                <CalendarDay key={index}
                                             date={date}
                                             startHour={startHour}
                                             endHour={endHour}
                                             style={{
                                                 gridRow: `1 /${hoursInDay + 1}`,
                                                 gridColumn: `${index + 2} /${index + 3}`,
                                             }}
                                             onHourClicked={onHourClicked}
                                             renderEvent={renderEvent}
                                             events={this.getDateEvents(date)}/>
                            ))}
                        </div>
                    </div>
                </div>
            )
        }
    });
