// @flow
import React from 'react';
import stringToColor from '../../../src/stringToColor';
import ClassicGrid from '../ClassicGrid';

/* disable until eslint issue is fixed https://github.com/yannickcr/eslint-plugin-react/issues/819 */
/* eslint-disable react/no-unused-prop-types */
type ItemProps = {
  data: {
    height: number,
    color: string,
    name: string,
  },
};

function Item(props: ItemProps) {
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

  constructor() {
    super();
    this.state = {
      pins: [],
    };
  }

  state: {
    pins: Array<{
      name: string,
      height: number,
      color: string,
    }>
  };

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
