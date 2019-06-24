import React, {Component} from 'react';
import {CalendarGrid} from './lib/CalendarGrid'
import {CalendarDayPicker} from './lib/CalendarDayPicker'
import moment from 'moment'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to React Calendar based on Grid CSS by Voopty</h2>
                </div>
                <div className="App-intro-tiday-picker">
                    <CalendarDayPicker date={moment()}/>
                </div>
                <div className="App-intro-grid">
                    <CalendarGrid startHour={7} endHour={22}
                                  events={[
                                      {
                                          title: 'whole day',
                                          start: moment.utc().set('hour', 0).set('minutes', 0),
                                          end: moment.utc().set('hour', 23).set('minutes', 59),
                                      },
                                      {
                                          title: 'voopty',
                                          start: moment.utc().set('hour', 8).set('minutes', 0),
                                          end: moment.utc().set('hour', 9).set('minutes', 0),
                                      },
                                      {
                                          title: 'calendar',
                                          start: moment.utc().set('hour', 8).set('minutes', 0),
                                          end: moment.utc().set('hour', 10).set('minutes', 0),
                                      },
                                      {
                                          title: 'says',
                                          start: moment.utc().set('hour', 9).set('minutes', 30),
                                          end: moment.utc().set('hour', 11).set('minutes', 0),
                                      },
                                      {
                                          title: 'hello',
                                          start: moment.utc().set('hour', 12).set('minutes', 0),
                                          end: moment.utc().set('hour', 14).set('minutes', 0),
                                      }
                                  ]}
                                  onTimeSlotClick={(hour) => alert(`hello from empty timeslot ${hour.format()}`)}/>
                </div>
            </div>
        );
    }
}

export default App;
