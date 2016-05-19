import Grid from '../src/Grid/Grid';
import Item from '../src/Grid/__docs__/Item';
import React from 'react';

function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let getPins = (meta = {}) => {
    meta.from = meta.from || 0;
    return new Promise(resolve => {
        let pins = [];
        for (let i = meta.from; i < meta.from + 20; i++) {
            pins.push({
                name: 'foo ' + i,
                height: Math.floor(Math.random() * 200) + 300,
                color: getRandomColor()
            });
        }
        setTimeout(() => {
            resolve(pins);
        }, 5);
    });
};

export default class ExampleGrid extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            pins: props.initialPins
        };
    }

    componentDidMount () {
        getPins().then(startPins => {
            this.setState({
                pins: startPins
            });
        });
    }

    loadItems (meta) {
        getPins(meta)
            .then(newPins => {
                this.setState({
                    pins: this.state.pins.concat(newPins)
                });
            });
    }

    render () {
        return (
            <div className='gridCentered'>
                <Grid
                    comp={Item}
                    items={this.state.pins}
                    loadItems={this.loadItems.bind(this)}
                />
            </div>
        );
    }
};

ExampleGrid.propTypes = {
    initialPins: React.PropTypes.array
};
