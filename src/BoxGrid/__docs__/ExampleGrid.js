import React from 'react';
import stringToColor from '../../stringToColor';
import BoxGrid from '../BoxGrid';
import Item from './Item';

const getRandomColor = () => stringToColor(`${Math.floor(Math.random() * 10000)}`);

const getPins = (meta = {}) => {
  const from = meta.from || 0;
  return new Promise((resolve) => {
    const pins = [];
    for (let i = from; i < from + 90; i += 1) {
      const r = Math.random();
      let colSpan;
      if (r > 0.95) colSpan = 4;
      else if (r > 0.9) colSpan = 3;
      else if (r > 0.7) colSpan = 2;
      else colSpan = 1;

      pins.push({
        name: `${i}`,
        height: Math.floor(Math.random() * 200) + 300,
        color: getRandomColor(),
        colSpan,
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
      <BoxGrid
        comp={Item}
        items={this.state.pins}
        loadItems={this.loadItems}
      />
    );
  }
}
