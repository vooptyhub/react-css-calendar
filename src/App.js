import React, {Component} from 'react';
import {CalendarGrid} from './lib/CalendarGrid'
import moment from 'moment'

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Welcome to React CSS Grid by Voopty</h2>
                </div>
                <div className="App-intro">
                    <CalendarGrid/>
                </div>
            </div>
        );
    }
}

export default App;
