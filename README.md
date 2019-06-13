*VooptyBusiness* in a set of management tools, developed for education and fitness. A crutial part of Voopty eco-system is Schedule Managment https://www.voopty.com/
We developed lightweigh and flexible calendar component which satisfies the most complicated needs of our clients

### React css calendar by Voopty
Install:

```npm install react-css-calendar```

or

```yarn add react-css-calendar```

## Example:

```
import React from 'react';
import {CalendarGrid} from './lib/CalendarGrid'
import moment from 'moment'

const SimpleExample = () => (
            <CalendarGrid startHour={7}
                                  endHour={22}
                                  events={[
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
  )
```

## Here you can find a workin component with extra customization https://www.voopty.com/studio/STUDIOTHEATREACTINGCONSERVATORY

![Voopty Calendar Example](https://github.com/vooptyhub/react-css-calendar/blob/master/public/Screenshot%20at%20Jun%2013%2010-50-23.png)




