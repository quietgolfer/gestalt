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

  return new Promise(resolve => {
    const pins = [];
    for (let i = from; i < until; i++) {
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

export default class ExampleGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pins: props.initialPins,
    };
  }

  componentDidMount() {
    getPins({}, this.props.collage).then(startPins => {
      this.setState({
        pins: startPins,
      });
    });
  }

  loadItems = (meta) => {
    getPins(meta, this.props.collage)
      .then(newPins => {
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
      dynamicGridProps.minCols = 1;
      dynamicGridProps.gutterWidth = 5;
      gridStyleProps.style.width = 500;
    }

    // Allow for infinite scroll if the test does not opt out with the finiteLength prop.
    if (!this.props.finiteLength) {
      dynamicGridProps.loadItems = this.loadItems;
    }

    return (
      <div id="gridWrapper" className="gridCentered" {...gridStyleProps}>
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
  collage: React.PropTypes.bool,
  constrained: React.PropTypes.bool,
  finiteLength: React.PropTypes.bool,
  initialPins: React.PropTypes.array,
};
