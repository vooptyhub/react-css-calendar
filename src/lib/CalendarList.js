import React, {Component} from 'react'
import {withStyles} from './styles'
import PropTypes from "prop-types";
import moment from 'moment'
import {colorScheme, dimensions} from "./Constants";

export const CalendarList = withStyles(({
    root: {
        borderTop: ({colorScheme: {divider}}) => `1px solid ${divider}`,
        borderLeft: ({colorScheme: {divider}}) => `1px solid ${divider}`,
        borderRight: ({colorScheme: {divider}}) => `1px solid ${divider}`,
        overflow: 'auto',
        flex: "1 0 0%",
        display: 'flex',
        flexDirection: 'column'
    },
    day: {
        display: 'flex',
        flexDirection: 'column',
        flex: "1 0 auto",
    },
}))(
    class extends Component {
        static propTypes = {
            dates: PropTypes.array.isRequired,
            events: PropTypes.array.isRequired,
            renderDate: PropTypes.func.isRequired,
            renderEvent: PropTypes.func.isRequired,
            dimensions: PropTypes.object.isRequired,
            colorScheme: PropTypes.object.isRequired,
            onTimeSlotClick: PropTypes.func
        };

        static defaultProps = {
            dates: [moment.utc()],
            events: [],
            renderEvent: (event) => event.title,
            renderDate: (hour) => moment({hour}).format('LT'),
            dimensions,
            colorScheme
        };

        getDateEvents(date) {
            return this.props.events.filter(({start, end}) =>
                moment(start).isSameOrBefore(date, 'day') &&
                moment(end).isSameOrAfter(date, 'day')
            )
        }

        renderDay = (date, dayIndex) => {
            const dayEvents = this.getDateEvents(date);
            if (dayEvents.length < 1) {
                return null
            }
            const {classes, renderDate, renderEvent} = this.props;
            const withKeyProp = (component, index) => React.cloneElement(component, {key: index});
            return (
                <div key={dayIndex}
                     className={classes.day}>
                    {withKeyProp(renderDate(date, dayIndex), dayIndex)}
                    {dayEvents.map((event, index) => withKeyProp(renderEvent(event), index))}
                </div>
            )
        };

        render() {
            const {classes, dates} = this.props;

            return (
                <div className={classes.root}>
                    {dates.map(this.renderDay)}
                </div>
            )
        }
    });
