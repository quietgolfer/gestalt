import ClassicGrid from '../ClassicGrid';
import React from 'react';

function Item(props) {
  const {
    data,
  } = props;

  let pinStyles = {
    border: '1px solid #fff',
    width: '195px',
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
  data: React.PropTypes.object,
};


function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const getPins = () => new Promise(resolve => {
  const pins = [];
  for (let i = 0; i < 5; i++) {
    pins.push({
      name: `foo ${i}`,
      height: Math.floor(Math.random() * 50) + 50,
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
    getPins().then(startPins => {
      this.setState({
        pins: startPins,
      });
    });
  }

  render() {
    return (
      <ClassicGrid
        comp={Item}
        columnWidth={195}
        gutterWidth={5}
        items={this.state.pins}
        minCols={1}
      />
    );
  }
}
