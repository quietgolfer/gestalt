// @flow
import React from 'react';
import FlexibleGrid from '../FlexibleGrid';
import Item from './Item';

const pins = [{
  color: '#8e7439',
  height: 1081,
  src: 'https://s-media-cache-ak0.pinimg.com/474x/7d/15/e1/7d15e1bf0bab2dcec9cda4e84826d872.jpg',
  width: 474,
  name: 'La Gran Muralla, Pekín, China',
}, {
  color: '#2b3938',
  height: 316,
  src: 'https://s-media-cache-ak0.pinimg.com/474x/48/bc/00/48bc00b140d2f52267438f1c6ee0fa95.jpg',
  width: 474,
  name: 'the Hang Son Doong cave in Vietnam',
}, {
  color: '#698157',
  height: 711,
  src: 'https://s-media-cache-ak0.pinimg.com/474x/4e/59/b2/4e59b2a5ae60b09e80dab06f78a9dfbb.jpg',
  width: 474,
  name: 'Plitvice Lakes National Park, Croatia',
}, {
  color: '#4e5d50',
  height: 632,
  src: 'https://s-media-cache-ak0.pinimg.com/474x/fc/f1/e3/fcf1e3dd56eb17a3a5fddda9d41f210f.jpg',
  width: 474,
  name: 'Ban Gioc – Detian Falls : 2 waterfalls straddling the Vietnamese and Chinese border.',
}, {
  color: '#6d6368',
  height: 710,
  src: 'https://s-media-cache-ak0.pinimg.com/474x/66/2c/8b/662c8bcaded0e84ef6dc0d49b661806d.jpg',
  width: 474,
  name: 'Border of China and Vietnam',
}];

const getPins = () => {
  let pinList = [];
  for (let i = 0; i < 10; i += 1) {
    pinList = pinList.concat(pins.slice());
  }
  return Promise.resolve(pinList);
};

export default class ExampleGrid extends React.Component {

  constructor() {
    super();
    this.state = {
      pins: [],
    };
  }

  state: {
    pins: Array<{
      color: string,
      height: number,
      name: string
    }>
  }

  componentDidMount() {
    getPins().then((startPins) => {
      this.setState({
        pins: startPins,
      });
    });
  }

  loadItems = (meta:{
    from: number
  }) => {
    getPins(meta)
      .then((newPins) => {
        this.setState({
          pins: this.state.pins.concat(newPins),
        });
      });
  }

  render() {
    return (
      <FlexibleGrid
        comp={Item}
        items={this.state.pins}
        loadItems={this.loadItems}
        minItemWidth={256}
      />
    );
  }
}
