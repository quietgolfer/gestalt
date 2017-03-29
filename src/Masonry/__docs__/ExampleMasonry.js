// @flow
import React from 'react';
import Masonry from '../Masonry';
import Item from './Item';

const pins = [{
  color: '#2b3938',
  height: 316,
  src: 'https://s-media-cache-ak0.pinimg.com/474x/48/bc/00/48bc00b140d2f52267438f1c6ee0fa95.jpg',
  width: 474,
  name: 'the Hang Son Doong cave in Vietnam',
}, {
  color: '#8e7439',
  height: 1081,
  src: 'https://s-media-cache-ak0.pinimg.com/474x/7d/15/e1/7d15e1bf0bab2dcec9cda4e84826d872.jpg',
  width: 474,
  name: 'La Gran Muralla, Pekín, China',
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

const inputStyle = { width: '700px', display: 'block', margin: '10px auto' };

const getPins = () => {
  let pinList = [];
  for (let i = 0; i < 3; i += 1) {
    pinList = pinList.concat(pins.slice());
  }
  return Promise.resolve(pinList);
};

export default class ExampleMasonry extends React.Component {

  static propTypes = {
    flexible: React.PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {
      pins: [],
      width: 700
    };
  }

  state: {
    pins: Array<{
      color: string,
      height: number,
      name: string,
      src: string,
      width: number,
    }>,
    width: number,
  }

  componentDidMount() {
    getPins().then((startPins) => {
      this.setState({
        pins: startPins,
      });
    });
  }

  grid: { handleResize: Function };
  scrollContainer: HTMLElement;

  // eslint-disable-next-line react/no-unused-prop-types
  updateWidth = ({ target }: { target: HTMLInputElement }) => {
    this.setState({ width: Number(target.value) }, () => this.grid.handleResize());
  }

  render() {
    const containerStyle = {
      height: '300px',
      margin: '0 auto',
      outline: '3px solid #ddd',
      overflowY: 'scroll',
      width: `${this.state.width}px`,
    };
    return (
      <div>
        <input type="range" defaultValue={700} onChange={this.updateWidth} min={200} max={700} step={5} style={inputStyle} />
        <div ref={(n) => { this.scrollContainer = n; }} style={containerStyle}>
          { this.scrollContainer && (
            <Masonry
              columnWidth={170}
              comp={Item}
              flexible={this.props.flexible}
              gutterWidth={5}
              items={this.state.pins}
              minCols={1}
              ref={(ref) => { this.grid = ref; }}
              scrollContainer={this.scrollContainer}
            />
          )}
        </div>
      </div>
    );
  }
}
