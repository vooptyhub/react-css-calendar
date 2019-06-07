import React, {Component} from 'react'
import {withStyles} from './styles'

export const CalendarList = withStyles(({
    root: {
        overflow: 'auto',
        flex: "1 0 auto",
    },
    day: {
        display: 'flex',
        flexDirection: 'column',
        flex: "1 0 auto",
    },
}))(
    class extends Component {

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
            const {classes, renderDateTitle, renderEvent} = this.props;
            const withKeyProp = (component, index) => React.cloneElement(component, {key: index});
            return (
                <div key={dayIndex}
                     className={classes.day}>
                    {withKeyProp(renderDateTitle(date, dayIndex), dayIndex)}
                    {dayEvents.map((event, index) => withKeyProp(renderEvent(event), index))}
                </div>
            )
        };

        render() {
            const {classes, dates} = this.props;

            return (
                <Grid container direction="column"
                      className={classes.root}>
                    {dates.map(this.renderDay)}
                </Grid>
            )
        }
    });
