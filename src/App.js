import React, {Component} from 'react';
import {CalendarGrid} from './lib/CalendarGrid'
import moment from 'moment'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to React Calendar based on Grid CSS by Voopty</h2>
                </div>
                <div className="App-intro">
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
                                  ]}
                                  onTimeSlotClick={(hour) => alert(`hello from empty timeslot ${hour.format()}`)}/>
                </div>
            </div>
        );
    }
}

export default App;
