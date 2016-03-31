import React from 'react';
import ReactDOM from 'react-dom';

import Grid from '../../components/Grid/Grid';

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

class App extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            pins: []
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

    renderItem (pin) {
        let pinStyles = {
            border: '1px solid #fff',
            width: '234px',
            background: pin.color,
            height: `${pin.height}px`
        };

        return (
            <div style={pinStyles}>
                {pin.name}
            </div>
        );
    }

    render () {
        return (
            <Grid
                items={this.state.pins}
                loadItems={this.loadItems.bind(this)}
                renderItem={this.renderItem.bind(this)}
            />
        );
    }
};

ReactDOM.render(React.createElement(App), document.getElementById('app'));
