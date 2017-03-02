import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

var react = require('react');

var ioc = require( 'socket.io-client' );
var port = 3000; //server настроен на этот порт
var client = ioc.connect( "http://localhost:" + port );

client.once( "connect", function () {
    console.log( 'Client: Connected to port ' + port );
} );


function getRandom() {
    return Math.floor(Math.random() * (90 - 0)) + 0;
}

class MyMap extends React.Component {
    constructor() {
        super();
        const items= [{
            lat : 28.62,
            lng : 77.06,
            text:'Delhi'
        }]
        this.state = {
            lat: 28.62,
            lng:  77.06,
            zoom: 3,
            items :items
        };
        this.addChild = this.addChild.bind(this);
        this.addNewPoint = this.addNewPoint.bind(this);
    }

    componentDidMount() {
        //client.on('point', this.addNewPoint);
        client.on('pointList', this.addNewPoint);
    }
    componentWillUnmount(){
        client.disconnect();
    }
    addNewPoint(pointlist)
    {
        console.log('new point added');
        for(var i=0; i < pointlist.length;i++)
            this.state.items.push({
                lat: pointlist[i].lat,
                lng: pointlist[i].lng,
                text: pointlist[i].text
            });
        // State change will cause component re-render
        this.setState({
            lat: 28.62,//pointlist[0].lat,
            lng: 77.06,//pointlist[0].lng,
            zoom: 2,
            items: this.state.items
        })
    }
    addChild() {
        var newlat = getRandom();
        var newLon = getRandom();
        this.state.items.push({
            lat: newlat,//28.59,
            lng: newLon, //78.06,
            text: 'new point'
        });
        // State change will cause component re-render
        this.setState({
            lat: newlat,//28.59,
            lng: newLon,//77.06,
            zoom: 5,
            items: this.state.items
        })
    }
    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div>
                {/*<button onClick={this.addChild}>Add point</button>*/}
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    {this.state.items.map((item, idx) => {
                            return (   <Marker position={[item.lat, item.lng]} key={idx}>
                                <Popup>
                                    <span>{item.text}</span>
                                </Popup>
                            </Marker>)
                        }
                    )}
                </Map>
            </div>
        )
    }
}

module.exports = MyMap;