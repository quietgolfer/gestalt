import Grid from '../src/Grid/Grid';
import Item from '../src/Grid/__docs__/Item';
import React from 'react';

function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const getPins = (meta = {}) => {
  const from = meta.from || 0;
  return new Promise(resolve => {
    const pins = [];
    for (let i = from; i < from + 20; i++) {
      pins.push({
        name: `foo ${i}`,
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
      pins: props.initialPins,
    };
  }

  componentDidMount() {
    getPins().then(startPins => {
      this.setState({
        pins: startPins,
      });
    });
  }

  loadItems = (meta) => {
    getPins(meta)
      .then(newPins => {
        this.setState({
          pins: this.state.pins.concat(newPins),
        });
      });
  }
  /* eslint react/jsx-no-bind:0 */
  render() {
    const dynamicGridProps = {};
    // Allow for infinite scroll if the test does not opt out with the finiteLength prop.
    if (!this.props.finiteLength) {
      dynamicGridProps.loadItems = this.loadItems;
    }
    return (
      <div className="gridCentered">
        <Grid
          comp={Item}
          items={this.state.pins}
          {...dynamicGridProps}
        />
        <div className="afterGrid"></div>
      </div>
    );
  }
}

ExampleGrid.propTypes = {
  finiteLength: React.PropTypes.bool,
  initialPins: React.PropTypes.array,
};
