import React from 'react';
import Masonry from '../../src/Masonry/Masonry';
import Item from './ExampleGridItem';
import stringToColor from '../../src/stringToColor';

const getRandomColor = () => stringToColor(`${Math.floor(Math.random() * 10000)}`);

export default class MasonryExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pins: props.initialPins,
    };
  }

  componentDidMount() {
    window.addEventListener('trigger-reflow', () => {
      this.gridRef.reflow();
      this.forceUpdate();
    });
  }

  getPins = (meta = {}, collage) => {
    const from = meta.from || 0;
    let until = from + 20;

    let baseHeight = 200;

    if (collage) {
      until = 5;
      baseHeight = 40;
    }

    return new Promise((resolve) => {
      const pins = [];
      for (let i = from; i < until; i += 1) {
        pins.push({
          name: `foo ${i}`,
          height: baseHeight + i,
          color: getRandomColor(),
        });
      }
      window.TEST_FETCH_COUNTS = window.TEST_FETCH_COUNTS || 0;
      window.TEST_FETCH_COUNTS += 1;
      window.NEXT_FETCH = () => {
        window.NEXT_FETCH = null;
        resolve(pins);
      };
      if (!this.props.manualFetch) {
        window.NEXT_FETCH();
      }
    });
  }

  handleInsertItem = (e) => {
    e.preventDefault();
    this.gridRef.insertItems([
      { name: 'Inserted', height: 300, color: '#f00' },
    ], 0 /* colIdx */, 0 /* itemIdx */);
  }


  loadItems = (meta) => {
    this.getPins(meta, this.props.collage)
      .then((newPins) => {
        this.setState({
          pins: this.state.pins.concat(newPins),
        });
      });
  }

  renderItem = data => <Item flexible={Boolean(this.props.flexible)} {...data} />

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

    if (this.props.flexible) {
      gridStyleProps.style.width = '100%';
      dynamicGridProps.gutterWidth = 0;
    }

    // Allow for infinite scroll if the test does not opt out with the finiteLength prop.
    if (!this.props.finiteLength) {
      dynamicGridProps.loadItems = this.loadItems;
    }

    const gridContainer = (
      <div id="gridWrapper" className="gridCentered" {...gridStyleProps}>
        <button id="insert-item" onClick={this.handleInsertItem}>Insert 1 item into grid</button>
        <Masonry
          comp={this.renderItem}
          flexible={Boolean(this.props.flexible)}
          items={this.state.pins}
          ref={(ref) => { this.gridRef = ref; }}
          {...dynamicGridProps}
        />
        <div className="afterGrid" />
      </div>
    );

    // Render multiple relative ancestors to verify virtual bound calculation.
    if (this.props.offsetTop) {
      const top = parseInt(this.props.offsetTop / 2, 10);
      return (
        <div style={{ top, position: 'relative' }}>
          <div style={{ top, position: 'relative' }}>
            {gridContainer}
          </div>
        </div>
      );
    }

    return gridContainer;
  }
}

MasonryExample.propTypes = {
  // Test case: Sets up props to display a collage layout.
  collage: React.PropTypes.string,
  // Test case: Constrains the width of the grid rendering.
  constrained: React.PropTypes.string,
  // Grid items should have flexible width.
  flexible: React.PropTypes.bool,
  // Whether or not to require tests to trigger fetch completion manually.
  manualFetch: React.PropTypes.string,
  // Test case: Does not allow infinite scroll.
  finiteLength: React.PropTypes.string,
  // The initial data from the server side render.
  initialPins: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  // Test case: Positions the element inside of a relative container, offset from the top.
  offsetTop: React.PropTypes.string,
};
