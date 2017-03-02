import React from 'react';
import {render} from 'react-dom';
import MyMap from './MyMap.jsx';

var mystyle = {
    color: 'purple',
    fontSize: 25,
    fontFamily: 'Libre Baskerville',
    lineHeight: 4,
    marginLeft: "2%"
};

class App extends React.Component {
    render() {
        return (
            <div>
                <p style={mystyle}>My Supper React Map</p>

                <MyMap/>
            </div>
        );
    }
}

render(<App/>, document.getElementById('app'));
