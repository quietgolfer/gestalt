/* eslint react/no-find-dom-node: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Packer from './Packer';
import styles from './Grid.css';
import WithLayout from './WithLayout';

export default class BoxGrid extends Component {

  constructor(props, context) {
    super(props, context);

    this.packer = new Packer();

    this.setCacheKey();
    this.gridWrapperHeight = 0;

    this.state = {
      layoutReady: false,
    };
  }

  /**
   * Adds hooks after the component mounts.
   */
  componentDidMount() {
    // We calculate columns and offset after the component mounts so we can measure our container.
    this.calculateColumns();
    this.reflow();

    this.boundResizeHandler = () => this.handleResize();

    this.props.scrollContainer.addEventListener('scroll', this.handleScroll);
    this.props.scrollContainer.addEventListener('resize', this.boundResizeHandler);

    /* eslint react/no-did-mount-set-state:0 */
    this.setState({
      layoutReady: true,
    });
  }

  componentDidUpdate() {
    setTimeout(() => {
      const longestColumn = this.highestColumn();
      if (this.gridWrapperHeight !== longestColumn) {
        this.gridWrapperHeight = longestColumn;
        this.gridWrapper.style.height = `${longestColumn}px`;

        this.scrollBuffer = this.getContainerHeight() * 2;
      }
    });
  }

  /**
   * Remove listeners when unmounting.
   */
  componentWillUnmount() {
    this.props.scrollContainer.removeEventListener('scroll', this.handleScroll);
    this.props.scrollContainer.removeEventListener('resize', this.boundResizeHandler);
  }

  /**
   * Returns the container height.
   */
  getContainerHeight() {
    const container = this.props.scrollContainer;
    return container.clientHeight || container.innerHeight;
  }

  /**
   * Returns the scroll position of the scroll container.
   */
  getScrollPos() {
    // Try accessing scrollY, as the grid will generally be scrolled by the window.
    const el = this.props.scrollContainer;
    return el.scrollY !== undefined ? el.scrollY : el.scrollTop;
  }

  /**
   * Sets a cache key based on the number of columns and a timestamp.
   * This is consumed by the WithLayout component to cache grid item layout.
   */
  setCacheKey() {
    this.cacheKey = `${this.state && this.state.gridWidth} - ${Date.now()}`;
  }

  /**
   * Delays resize handling in case the scroll container is still being resized.
   */
  handleResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
    this.resizeTimeout = setTimeout(this.reflowIfNeeded.bind(this), 100);
  }

  /**
   * Resets the local cache.
   */
  reflow() {
    const colConfig = this.calculateColumns();

    // Reset root node and re-render
    this.packer.init(colConfig);

    this.setCacheKey();

    // Whether or not we have requested new items.
    // This is used as a flag to signal that we need to wait before loading additional items.
    this.fetchingWith = false;
    this.forceUpdate();
  }

  /**
   * Determines the number of columns to display.
   */
  calculateColumns() {
    if (!this.props.scrollContainer) {
      return 0;
    }

    /* eslint react/no-find-dom-node: 0 */
    const parentNode = ReactDOM.findDOMNode(this).parentNode;
    const gridWidth = parentNode.clientWidth;

    const colCount = Math.floor(gridWidth / this.props.minItemWidth);
    const itemWidth = gridWidth / colCount;

    this.setState({
      gridWidth,
      itemWidth,
    });
    return {
      colCount,
      gridWidth,
      itemWidth,
    };
  }

  /**
   * Reflows items if needed after a resize.
   * We need to reflow items if the number of columns we would display should change.
   */
  reflowIfNeeded() {
    const gridWidth = ReactDOM.findDOMNode(this).parentNode.clientWidth;

    this.reflow(this.calculateColumns());
    this.setState({
      // Recalculate width with new col count.
      gridWidth,
    });
    this.forceUpdate();
  }

  /**
   * Use the item endY or highest available startY to find the grid height.
   */
  highestColumn() {
    let height = 0;
    for (let i = 0; i < this.packer.columns.length; i += 1) {
      const item = this.packer.columns[i][this.packer.columns[i].length - 1];
      if (item.endY !== null && item.endY > height) {
        height = item.endY;
      } else if (item.startY > height) {
        height = item.startY;
      }
    }
    return height;
  }

  /**
   * Fetches additional items if needed.
   */
  handleScroll = () => {
    // Only fetch more items if we already have some items loaded.
    // The initial render should be supplied through props.
    if (!this.props.items.length || this.fetchingWith) {
      return;
    }

    // Only load items if props.loadItems is defined.
    if (!this.props.loadItems) {
      return;
    }

    if (this.getScrollPos() + (this.scrollBuffer * 2) > this.highestColumn()) {
      this.fetchingWith = this.props.items.length;
      this.props.loadItems({
        from: this.props.items.length,
      });
    }
  }

  /**
   * Processes height information for an item based on width and height.
   */
  processInfo = (element, width, height) => {
    const { top, left } = this.packer.position(
      width,
      height,
      // TODO: Find a better way to extract child column count from the component.
      parseInt(element.children[0].dataset.cols, 10)
    );

    /* eslint no-param-reassign: 0 */
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
    element.style.width = `${this.state.itemWidth}px`;
    element.className = styles.Grid__Item;
  }

  render() {
    if (this.fetchingWith !== false && this.fetchingWith !== this.props.items.length) {
      this.fetchingWith = false;
    }

    return (
      <div
        className={styles.Grid}
        ref={(ref) => { this.gridWrapper = ref; }}
      >
        <WithLayout
          data={this.props.items}
          invalidateCacheKey={this.cacheKey}
          layoutReady={this.state.layoutReady}
          processInfo={this.processInfo}
        >
          {this.props.items.map((item, idx) =>
            <div
              className="static"
              key={idx}
            >
              <this.props.comp
                columnWidth={this.state.itemWidth}
                data={this.props.items[idx]}
                itemIdx={idx}
              />
            </div>
          )}
        </WithLayout>
      </div>
    );
  }
}

BoxGrid.propTypes = {
  /**
   * The component to render.
   */
  comp: React.PropTypes.func,

  /**
   * An array of all objects to display in the grid.
   */
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})),

  /**
   * A callback which the grid calls when we need to load more items as the user scrolls.
   * The callback should update the state of the items, and pass those in as props
   * to this component.
   */
  loadItems: React.PropTypes.func,

  /**
   * The max-width of each column.
   */
  /* TODO @KevinGrandon see whether we can remove this */
  /* eslint react/no-unused-prop-types: 0 */
  maxItemWidth: React.PropTypes.number,

  /**
   * The min-width of each column.
   */
  minItemWidth: React.PropTypes.number,

  /**
   * The scroll container to use. Defaults to window.
   */
  scrollContainer: React.PropTypes.shape({
    addEventListener: React.PropTypes.func,
    removeEventListener: React.PropTypes.func,
  }),
};

BoxGrid.defaultProps = {
  minItemWidth: 236,
  maxItemWidth: 300,
  scrollContainer: typeof window !== 'undefined' ? window : null,
};
