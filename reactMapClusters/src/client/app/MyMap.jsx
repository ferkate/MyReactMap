import React from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ClusterLayer from 'react-leaflet-cluster-layer';
import ExampleClusterComponent from './ExampleClusterComponent.jsx';

var react = require('react');

var ioc = require( 'socket.io-client' );
var port = 3000; //server настроен на этот порт
var client = ioc.connect( "http://localhost:" + port );

client.once( "connect", function () {
    console.log( 'Client: Connected to port ' + port );
} );

class MyMap extends React.Component {
    constructor() {
        super();
        const markers = [
            {
                position: { lng: 77.06, lat: 28.62 },
                text: 'Delhi',
            }
        ];
        this.state = {
            lat: 28.62,
            lng:  77.06,
            zoom: 3,
            markers: markers
        };
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
        {
            this.state.markers.push({
                position: {
                    lat: pointlist[i].lat,
                    lng: pointlist[i].lng
                },
                text: pointlist[i].text
            });
        }
        // State change will cause component re-render
        this.setState({
            lat: 28.62,//pointlist[0].lat,
            lng: 77.06,//pointlist[0].lng,
            zoom: 2,
            markers: this.state.markers
        })
    }
    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div>
                <Map center={position} zoom={this.state.zoom}>
                    <ClusterLayer
                        markers={this.state.markers}
                        clusterComponent={ExampleClusterComponent} />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                </Map>
            </div>
        )
    }
}

module.exports = MyMap;