import React from 'react';

class ExampleClusterComponent extends React.Component {

    render() {
        const style = {
            border: 'solid 2px darkgrey',
            borderRadius: '8px',
            backgroundColor: 'white',
            padding: '1em',
            textAlign: 'center'
        };
        const cluster = this.props.cluster;

        if (cluster.markers.length == 1) {
            return (
                <div style={style} >{cluster.markers[0].text}</div>
            );
        }

        return (
            <div style={style}>{cluster.markers.length} items</div>
        );
    }

}

export default ExampleClusterComponent;