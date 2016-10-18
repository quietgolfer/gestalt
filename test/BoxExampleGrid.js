import React from 'react';
import BoxGrid from '../packages/gestalt-box-grid/BoxGrid';
import Item from '../packages/gestalt-box-grid/__docs__/Item';
import stringToColor from '../packages/gestalt-string-to-color';

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

export default class BoxExampleGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pins: props.initialPins,
    };
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    this.setState({
      pins: this.props.initialPins,
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
  /* eslint react/jsx-no-bind:0 */
  render() {
    const dynamicGridProps = {};

    const gridStyleProps = {
      style: {},
    };

    if (this.props.constrained) {
      gridStyleProps.style.margin = '0px 200px';
    }

    // Allow for infinite scroll if the test does not opt out with the finiteLength prop.
    if (!this.props.finiteLength) {
      dynamicGridProps.loadItems = this.loadItems;
    }

    return (
      <div id="gridWrapper" {...gridStyleProps}>
        <BoxGrid
          comp={Item}
          items={this.state.pins}
          {...dynamicGridProps}
        />
      </div>
    );
  }
}

BoxExampleGrid.propTypes = {
  // Test case: Constrains the width of the grid rendering.
  constrained: React.PropTypes.bool,
  // Test case: Does not allow infinite scroll.
  finiteLength: React.PropTypes.bool,
  // The initial data from the server side render.
  initialPins: React.PropTypes.arrayOf(React.PropTypes.shape({})),
};