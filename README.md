Lightweight and flexible calendar component which satisfies the most complicated needs of our clients

### React css calendar
Install:

```npm install react-css-calendar```

or

```yarn add react-css-calendar```

## Example:

```
import React from 'react';
import {CalendarGrid} from 'react-css-calendar'
import moment from 'moment'

const SimpleExample = () => (
            <CalendarGrid events={[
                                      {
                                          title: 'voopty',
                                          start: moment.utc().set('hour', 8),
                                          end: moment.utc().set('hour', 9),
                                      },
                                      {
                                          title: 'calendar',
                                          start: moment.utc().set('hour', 8),
                                          end: moment.utc().set('hour', 10),
                                      },
                                      {
                                          title: 'says',
                                          start: moment.utc().set('hour', 9).set('minutes', 30),
                                          end: moment.utc().set('hour', 11),
                                      },
                                      {
                                          title: 'hello',
                                          start: moment.utc().set('hour', 12),
                                          end: moment.utc().set('hour', 14),
                                      }
                                  ]}/>
  )
```
# Props:
Name | Type | Default | Description
------------ | -------------| -------------| -------------
startHour* | number | 0 | hour when vertical timeline begins
endHour* | number | 24 | hour when vertical timeline ends
events* | array | [] | calendar events to display. The order doesn't matter. Required fields of an event to be displayed correctly is `{start: moment, end: moment}`
columns* | array | [moment.utc()] | calendar columns to render(doesn't have to be dates [see example with custom grouping](#Columns-are-not-days-of-the-week))
renderTime* | (moment) => UIComponent | `(date) => date.format('LT')` | what to render on the timeline for each hour
renderColumnName* | (column) => UIComponent | `(date) => date.format('D MMM')` | what to render for each calendar column
renderEvent* | (event) => UIComponent | `(event) => event.title` | what to render for each calendar event
dimensions* | `{ tenMinutesHeight: number, timeLineWidth: number, headerHeight: number, groupedEventsMargin: number }` | `{ tenMinutesHeight: 20, timeLineWidth: 70, headerHeight: 50, groupedEventsMargin: 0 }` | calendar dimentions constants
colorScheme* | `{ background: color, divider: color, hover: color, header: color}` | `{ background: '#fff', divider: '#DCDCDC', hover: '#E6E6E6', header: '#F5F5F5'}` | calendar color settings
getColumnDate* | (column) => moment | (date) => date |  what date should be used to each column ([see example with custom grouping](#Columns-are-not-days-of-the-week))
getColumnEvents* | (column, {events: array}) => array | `(date, {events}) => (events.filter(({start, end}) =>moment(start).isSameOrBefore(date, 'day') && moment(end).isSameOrAfter(date, 'day')))` | return array of events to be displayed in the column
onTimeSlotClick | (moment) => () | | how to handle click on empty timeslot

### Use Cases:

## Simple UI customization 
![Voopty Calendar Example](https://github.com/vooptyhub/react-css-calendar/blob/master/public/Screenshot%20at%20Jun%2013%2010-50-23.png)

## Columns are not days of the week
In the example, the date is fixed, but columns are represented by people who are teaching the class.
![Voopty Grouped Calendar Example](https://github.com/vooptyhub/react-css-calendar/blob/master/public/Screenshot%20at%20Jun%2013%2011-48-44.png)
For that we have to override default values of following props:
* `columns` - an array of people who are teaching the classes during the fixed date
* `renderColumnName` - display info about the person who is teaching the class
* `getColumnDate` - return the fixed date for any column
* `getColumnEvents` - return list of the events taught by the person in the column


