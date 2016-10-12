import React from 'react';
import FlexibleGrid from '../packages/gestalt-flexible-grid/FlexibleGrid';
import Item from '../packages/gestalt-flexible-grid/__docs__/Item';

function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const getPins = (meta = {}, collage) => {
  const from = meta.from || 0;
  let until = from + 20;

  let randHeight = 200;
  let heightMin = 300;

  if (collage) {
    until = 5;
    randHeight = 40;
    heightMin = 40;
  }

  return new Promise((resolve) => {
    const pins = [];
    for (let i = from; i < until; i += 1) {
      pins.push({
        name: `foo ${i}`,
        height: Math.floor(Math.random() * randHeight) + heightMin,
        color: getRandomColor(),
      });
    }
    setTimeout(() => {
      resolve(pins);
    }, 5);
  });
};

export default class FlexibleExampleGrid extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.constructorItemSplice) {
      this.state = {
        pins: props.initialPins.slice(0, 5),
      };
    } else {
      this.state = {
        pins: props.initialPins,
      };
    }
  }

  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    if (this.props.constructorItemSplice) {
      this.setState({
        pins: this.props.initialPins,
      });
    }
  }

  loadItems = (meta) => {
    getPins(meta, this.props.collage)
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

    // One example of a collage layout w/o scrolling.
    if (this.props.collage) {
      dynamicGridProps.maxItemWidth = 300;
      dynamicGridProps.minItemWidth = 200;
      gridStyleProps.style.width = 500;
    }

    // Allow for infinite scroll if the test does not opt out with the finiteLength prop.
    if (!this.props.finiteLength) {
      dynamicGridProps.loadItems = this.loadItems;
    }

    if (this.props.maxCols) {
      dynamicGridProps.maxCols = 2;
    }

    return (
      <div id="gridWrapper" className="gridCentered" {...gridStyleProps}>
        <FlexibleGrid
          comp={Item}
          items={this.state.pins}
          {...dynamicGridProps}
        />
        <div className="afterGrid" />
      </div>
    );
  }
}

FlexibleExampleGrid.propTypes = {
  // Test case: Sets up props to display a collage layout.
  collage: React.PropTypes.bool,
  // Test case: Constrains the width of the grid rendering.
  constrained: React.PropTypes.bool,
  // Test case: Slices items in the constructor, then sets the entire list in componentDidMount.
  constructorItemSplice: React.PropTypes.bool,
  // Test case: Does not allow infinite scroll.
  finiteLength: React.PropTypes.bool,
  // The initial data from the server side render.
  initialPins: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  // Whether or not to set the maxCols prop.
  maxCols: React.PropTypes.bool,
};
