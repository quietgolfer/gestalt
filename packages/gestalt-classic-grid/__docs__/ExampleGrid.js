// @flow
import React from 'react';
import stringToColor from 'gestalt-string-to-color';
import ClassicGrid from '../ClassicGrid';
import Item from './Item';

const getRandomColor = () => stringToColor(`${Math.floor(Math.random() * 10000)}`);

const getPins = (meta = {}) => {
  const from = meta.from || 0;
  return new Promise((resolve) => {
    const pins = [];
    for (let i = from; i < from + 20; i += 1) {
      pins.push({
        name: `Item: ${i}`,
        height: Math.floor(Math.random() * 200) + 300,
        color: getRandomColor(),
      });
    }
    setTimeout(() => {
      resolve(pins);
    }, 5);
  });
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
      <ClassicGrid
        comp={Item}
        items={this.state.pins}
        loadItems={this.loadItems}
        minCols={1}
      />
    );
  }
}
