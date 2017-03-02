import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

/*const position = [51.505, -0.09];
var MyMap = React.createClass({
    render: function () {
        return (
            <div style={{height: 900}}>
                <Map center={position} zoom={13}>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
                        </Popup>
                    </Marker>
                </Map>
            </div>)
    }
});
*/


class MyMap extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
        };
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}
                        >
                    <Popup>
                        <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}

module.exports = MyMap;