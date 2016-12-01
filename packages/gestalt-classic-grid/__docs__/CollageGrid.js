import React from 'react';
import stringToColor from 'gestalt-string-to-color';
import ClassicGrid from '../ClassicGrid';

function Item(props) {
  const {
    data,
  } = props;

  const pinStyles = {
    border: '1px solid #fff',
    width: '195px',
    background: data.color,
    height: data.height,
    padding: 10,
    boxSizing: 'border-box',
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

const getRandomColor = () => stringToColor(`${Math.floor(Math.random() * 10000)}`);

const getPins = () => new Promise((resolve) => {
  const pins = [];
  for (let i = 0; i < 5; i += 1) {
    pins.push({
      name: `Item: ${i}`,
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
    getPins().then((startPins) => {
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
      />
    );
  }
}
