import React from 'react';
import Masonry from '../../src/Masonry/Masonry';
import Item from './ExampleGridItem';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default class MasonryExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: props.initialPins,
    };
  }

  componentDidMount() {
    window.addEventListener('trigger-reflow', () => {
      this.gridRef.reflow();
      this.forceUpdate();
    });

    window.addEventListener('set-masonry-items', (e) => {
      this.setState({
        items: e.detail.items,
      });
    });

    // Trigger a re-render in case we need to render /w scrollContainer.
    setTimeout(() => {
      this.setState({
        mounted: true
      });
    });
  }

  getItems = (meta = {}, collage) => {
    const from = meta.from || 0;
    let until = from + 20;

    let baseHeight = 200;

    if (collage) {
      until = 5;
      baseHeight = 40;
    }

    return new Promise((resolve) => {
      const items = [];
      for (let i = from; i < until; i += 1) {
        items.push({
          name: `foo ${i}`,
          height: baseHeight + i,
          color: getRandomColor(),
        });
      }
      window.TEST_FETCH_COUNTS = window.TEST_FETCH_COUNTS || 0;
      window.TEST_FETCH_COUNTS += 1;
      window.NEXT_FETCH = () => {
        window.NEXT_FETCH = null;
        resolve(items);
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
    this.getItems(meta, this.props.collage)
      .then((newItems) => {
        this.setState({
          items: this.state.items.concat(newItems),
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

    if (this.props.scrollContainer && this.scrollContainer) {
      dynamicGridProps.scrollContainer = this.scrollContainer;
    }

    let gridWrapper = (
      <div id="gridWrapper" className="gridCentered" {...gridStyleProps}>
        <button id="insert-item" onClick={this.handleInsertItem}>Insert 1 item into grid</button>
        <Masonry
          comp={this.renderItem}
          flexible={Boolean(this.props.flexible)}
          items={this.state.items}
          ref={(ref) => { this.gridRef = ref; }}
          serverRender
          {...dynamicGridProps}
        />
        <div className="afterGrid" />
      </div>
    );

    // Render multiple relative ancestors to verify virtual bound calculation.
    if (this.props.offsetTop) {
      const top = parseInt(this.props.offsetTop / 2, 10);
      gridWrapper = (
        <div style={{ top, position: 'relative' }}>
          <div style={{ top, position: 'relative' }}>
            {gridWrapper}
          </div>
        </div>
      );
    }

    if (this.props.scrollContainer) {
      const containerStyle = {
        height: 400,
        overflowY: 'scroll',
      };
      return (
        <div
          data-scroll-container
          ref={(n) => { this.scrollContainer = n; }}
          style={containerStyle}
        >
          { this.scrollContainer && gridWrapper }
        </div>
      );
    }

    return gridWrapper;
  }
}

MasonryExample.propTypes = {
  // Sets up props to display a collage layout.
  collage: React.PropTypes.string,
  // Constrains the width of the grid rendering.
  constrained: React.PropTypes.string,
  // Grid items should have flexible width.
  flexible: React.PropTypes.bool,
  // Whether or not to require tests to trigger fetch completion manually.
  manualFetch: React.PropTypes.string,
  // Does not allow infinite scroll.
  finiteLength: React.PropTypes.string,
  // The initial data from the server side render.
  initialPins: React.PropTypes.arrayOf(React.PropTypes.shape({})),
  // Positions the element inside of a relative container, offset from the top.
  offsetTop: React.PropTypes.string,
  // If we should position the grid within a scrollContainer besides the window.
  scrollContainer: React.PropTypes.string,
};
