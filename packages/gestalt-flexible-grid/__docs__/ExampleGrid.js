import React from 'react';
import stringToColor from 'gestalt-string-to-color';
import FlexibleGrid from '../FlexibleGrid';
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

  constructor(props) {
    super(props);
    this.state = {
      pins: [],
    };
  }

  componentDidMount() {
    getPins().then((startPins) => {
      this.setState({
        pins: startPins,
      });
    });
  }

  loadItems = (meta) => {
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
      />
    );
  }
}
