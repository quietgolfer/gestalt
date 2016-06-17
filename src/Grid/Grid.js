import React, { Component } from 'react';
import styles from './Grid.css';
import WithLayout from './WithLayout';

// Buffer of pixels before we load more items when scrolling.
// TODO: This should by dynamic, based on the size of the container and resource response time.
const SCROLL_BUFFER = 400;

export default class Grid extends Component {

  constructor(props, context) {
    super(props, context);

    this.currColHeights = [];
    this.setCacheKey();

    this.state = {
      containerWidth: '100%',
    };
  }

  componentWillMount() {
    // We calculate columns and offset just before the component mounts
    // so that children have the correct column count when mounting
    this.reflow(this.calculateColumns());
  }

  /**
   * Adds hooks after the component mounts.
   */
  componentDidMount() {
    this.boundScrollHandler = () => {
      this.fetchMoreIfNeeded();
    };

    this.boundResizeHandler = () => this.handleResize();

    this.props.scrollContainer.addEventListener('scroll', this.boundScrollHandler);
    this.props.scrollContainer.addEventListener('resize', this.boundResizeHandler);

    /* eslint react/no-did-mount-set-state:0 */
    this.setState({
      // Since items are positioned absolutely, we can't rely on margin or padding to center
      // an arbitrary number of columns. Calculate the width in order to center the grid.
      containerWidth: this.determineWidth(),
    });
  }

  /**
   * Remove listeners when unmounting.
   */
  componentWillUnmount() {
    this.props.scrollContainer.removeEventListener('scroll', this.boundScrollHandler);
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
    this.cacheKey = `${this.currColHeights.length} - ${Date.now()}`;
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
  reflow(columnCount) {
    const columnCountOutput = columnCount || this.calculateColumns();

    // Sets the columns heights as an array, each member corresponding to a column.
    if (typeof document === 'undefined') {
      this.currColHeights = [];
    } else {
      this.currColHeights = new (self.Uint32Array || self.Array)(columnCountOutput);
    }
    this.setCacheKey();

    // Whether or not we have requested new items.
    // This is used as a flag to signal that we need to wait before loading additional items.
    this.fetchingWith = false;
  }

  /**
   * Determines the number of columns to display.
   */
  calculateColumns() {
    if (!this.props.scrollContainer) {
      return 0;
    }
    const eachItemWidth = this.props.columnWidth + this.props.gutterWidth;
    const scroller = this.props.scrollContainer;
    let newColCount = Math.floor((scroller.clientWidth || scroller.innerWidth) / eachItemWidth);

    if (newColCount < this.props.minCols) {
      newColCount = this.props.minCols;
    }
    return newColCount;
  }

  /**
   * Reflows items if needed after a resize.
   * We need to reflow items if the number of columns we would display should change.
   */
  reflowIfNeeded() {
    const newColCount = this.calculateColumns();
    const containerWidth = this.determineWidth();

    if (newColCount !== this.currColHeights.length
      || this.state.containerWidth !== containerWidth) {
      this.reflow(newColCount);
      // Recalculate width with new col count.
      this.setState({ containerWidth: this.determineWidth() });
      this.forceUpdate();
      return true;
    }
    return false;
  }

  /**
   * Fetches additional items if needed.
   */
  fetchMoreIfNeeded() {
    // Only fetch more items if we already have some items loaded.
    // The initial render should be supplied through props.
    if (!this.props.items.length || this.fetchingWith) {
      return;
    }

    const column = this.shortestColumn();
    const height = this.currColHeights[column];

    if (height - this.getScrollPos() - SCROLL_BUFFER < this.getContainerHeight()) {
      this.fetchingWith = this.props.items.length;
      this.props.loadItems({
        from: this.props.items.length,
      });
    }
  }

  /**
   * # of columns * total item width - 1 item margin
   */
  determineWidth() {
    const eachItemWidth = this.props.columnWidth + this.props.gutterWidth;
    return `${(this.currColHeights.length * eachItemWidth) - this.props.gutterWidth}px`;
  }

  /**
   * Returns the index of the shortest column.
   */
  shortestColumn() {
    let min = 0;
    for (let i = 1; i < this.currColHeights.length; i++) {
      if (this.currColHeights[i] < this.currColHeights[min]) {
        min = i;
      }
    }
    return min;
  }

  /**
   * Processes height information for an item based on width and height.
   */
  processInfo = (data, width, height) => {
    const column = this.shortestColumn();
    const top = this.currColHeights[column] || 0;
    const left = column * this.props.columnWidth + this.props.gutterWidth * column;
    this.currColHeights[column] += height + this.props.gutterWidth;

    return {
      top,
      left,
    };
  }

  render() {
    if (this.fetchingWith !== false && this.fetchingWith !== this.props.items.length) {
      this.fetchingWith = false;
    }

    return (
      <div className={styles.Grid} style={{ width: this.state.containerWidth }}>
        {this.props.items.map((item, idx) =>
          <WithLayout
            data={item}
            invalidateCacheKey={this.cacheKey}
            key={idx}
            processInfo={this.processInfo}
          >
          {
            (position = null) => {
              const itemStyles = {};
              if (position) {
                itemStyles.style = {
                  ...styles.gridItem,
                  top: position.top,
                  left: position.left,
                };
              }
              return (
                <div
                  className={(position ? styles.Grid__Item : 'static')}
                  key={idx}
                  {...itemStyles}
                >
                  <this.props.comp data={item} itemIdx={idx} />
                </div>
              );
            }
          }
          </WithLayout>
        )}
      </div>
    );
  }
}

Grid.propTypes = {
  /**
   * The width of each column.
   */
  columnWidth: React.PropTypes.number,

  /**
   * The component to render.
   */
  comp: React.PropTypes.func,

  /**
   * The amount of space between each item.
   */
  gutterWidth: React.PropTypes.number,

  /**
   * An array of all objects to display in the grid.
   */
  items: React.PropTypes.array,

  /**
   * A callback which the grid calls when we need to load more items as the user scrolls.
   * The callback should update the state of the items, and pass those in as props
   * to this component.
   */
  loadItems: React.PropTypes.func,

  /**
   * Minimum number of columns to display.
   */
  minCols: React.PropTypes.number,

  /**
   * The scroll container to use. Defaults to window.
   */
  scrollContainer: React.PropTypes.object,
};

Grid.defaultProps = {
  columnWidth: 236,
  gutterWidth: 14,
  minCols: 3,
  scrollContainer: typeof window !== 'undefined' ? window : null,
};
