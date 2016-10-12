import React from 'react';
import FlexibleGrid from '../FlexibleGrid';

function Item(props) {
  const {
    data,
  } = props;

  const pinStyles = {
    background: data.color,
    height: data.height,
  };

  return (
    <div style={pinStyles}>
      {data.name}
    </div>
  );
}

Item.propTypes = {
  data: React.PropTypes.shape({}),
};


function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const getPins = () => new Promise((resolve) => {
  const pins = [];
  for (let i = 0; i < 8; i += 1) {
    pins.push({
      name: `foo ${i}`,
      height: Math.floor(Math.random() * 50) + 150,
      color: getRandomColor(),
    });
  }
  resolve(pins);
});

export default class CollageGrid extends React.Component {

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

  render() {
    return (
      <div style={{ border: '1px solid #000', height: 400, width: 400, overflow: 'hidden' }}>
        <FlexibleGrid
          comp={Item}
          minItemWidth={200}
          maxItemWidth={200}
          items={this.state.pins}
        />
      </div>
    );
  }
}
