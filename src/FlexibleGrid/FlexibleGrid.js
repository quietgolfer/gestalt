// @flow
/* eslint react/no-find-dom-node: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ScrollFetch from '../ScrollFetch/ScrollFetch';
import styles from './Grid.css';
import WithLayout from './WithLayout';

type Props<T> = {
  comp: () => void,
  idealItemWidth: number,
  items: T[],
  maxCols: number,
  minCols: number,
  loadItems: () => void,
  scrollContainer: HTMLElement,
};

export default class FlexibleGrid extends Component {
  static defaultProps = {
    minCols: 1,
    maxCols: Infinity,
    idealItemWidth: 236,
    scrollContainer: typeof window !== 'undefined' ? window : null,
  };

  constructor(props: Props<*>) {
    super(props);

    this.currColHeights = [];
    this.setCacheKey();
    this.gridWrapperHeight = 0;

    this.state = {
      fetchingFrom: false,
      layoutReady: false,
    };
  }

  state: {
    fetchingFrom: bool | number,
    layoutReady: bool
  };

  /**
   * Adds hooks after the component mounts.
   */
  componentDidMount() {
    // We calculate columns and offset after the component mounts so we can measure our container.
    this.gridWidth = ReactDOM.findDOMNode(this).parentNode.clientWidth;
    this.reflow();

    this.boundResizeHandler = () => this.handleResize();

    window.addEventListener('resize', this.boundResizeHandler);

    /* eslint react/no-did-mount-set-state:0 */
    this.setState({
      layoutReady: true,
    });
  }

  componentWillReceiveProps(nextProps: Props<*>) {
    if (this.state.fetchingFrom !== false && this.state.fetchingFrom !== nextProps.items.length) {
      this.setState({
        fetchingFrom: false,
      });
    }
  }

  /**
   * Sets the height of the grid after the component updates.
   * This allows stacking of items under the grid due to absolutely positioned elements.
   */
  componentDidUpdate() {
    setTimeout(() => {
      const longestColumn = Math.max.apply(null, this.currColHeights);
      if (this.gridWrapperHeight !== longestColumn) {
        this.gridWrapperHeight = longestColumn;
        this.gridWrapper.style.height = `${longestColumn}px`;
      }
    });
  }

  /**
   * Remove listeners when unmounting.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.boundResizeHandler);
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
    this.cacheKey = `${this.state && this.gridWidth} - ${Date.now()}`;
  }

  boundResizeHandler: () => void;
  cacheKey: string;
  currColHeights: Array<number>;
  gridWidth: number;
  gridWrapper: HTMLElement;
  gridWrapperHeight: number;
  resizeTimeout: ?number;
  scrollBuffer: number;

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
    const columnCountOutput = this.calculateColumns();

    // Sets the columns heights as an array, each member corresponding to a column.
    if (typeof document === 'undefined') {
      this.currColHeights = [];
    } else {
      this.currColHeights = new (self.Uint32Array || self.Array)(columnCountOutput);
    }
    this.setCacheKey();

    // Whether or not we have requested new items.
    // This is used as a flag to signal that we need to wait before loading additional items.
    this.setState({
      fetchingFrom: false,
    });
    this.forceUpdate();
  }

  /**
   * Determines the number of columns to display.
   */
  calculateColumns() {
    if (!this.props.scrollContainer) {
      return 0;
    }

    let newColCount = Math.floor(this.gridWidth / this.props.idealItemWidth);

    if (this.props.maxCols) {
      newColCount = Math.min(this.props.maxCols, newColCount);
    }

    if (this.props.minCols) {
      newColCount = Math.max(this.props.minCols, newColCount);
    }

    return newColCount;
  }

  /**
   * Reflows items if needed after a resize.
   * We need to reflow items if the number of columns we would display should change.
   */
  reflowIfNeeded() {
    const newGridWidth = ReactDOM.findDOMNode(this).parentNode.clientWidth;
    if (this.gridWidth !== newGridWidth) {
      this.gridWidth = newGridWidth;
      this.reflow();
    }
  }

  /**
   * Returns the index of the shortest column.
   */
  shortestColumn() {
    let min = 0;
    for (let i = 1; i < this.currColHeights.length; i += 1) {
      if (this.currColHeights[i] < this.currColHeights[min]) {
        min = i;
      }
    }
    return min;
  }

  fetchMore = () => {
    if (this.props.loadItems) {
      this.setState({
        fetchingFrom: this.props.items.length,
      });
      this.props.loadItems({
        from: this.props.items.length,
      });
    }
  }

  /**
   * Processes height information for an item based on width and height.
   */
  processInfo = (element: HTMLElement, width: number, height: number) => {
    const column = this.shortestColumn();
    const top = this.currColHeights[column] || 0;
    const left = column * (this.gridWidth / this.currColHeights.length);

    this.currColHeights[column] += height;

    /* eslint no-param-reassign: 0 */
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
    element.className = styles.Grid__Item;
  }

  renderHeight = () => {
    const column = this.shortestColumn();
    return this.currColHeights[column];
  }

  render() {
    const fluidWidth = this.gridWidth ? this.gridWidth / this.currColHeights.length : 'auto';

    return (
      <div
        className={styles.Grid}
        ref={(ref) => { this.gridWrapper = ref; }}
      >
        <ScrollFetch
          container={this.props.scrollContainer}
          fetchMore={this.fetchMore}
          isFetching={this.state.fetchingFrom !== false}
          renderHeight={this.renderHeight}
        />
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
              <div style={{ width: fluidWidth }}>
                <this.props.comp data={this.props.items[idx]} itemIdx={idx} />
              </div>
            </div>
          )}
        </WithLayout>
      </div>
    );
  }
}

FlexibleGrid.propTypes = {
  /**
   * The component to render.
   */
  /* eslint react/no-unused-prop-types: 0 */
  comp: React.PropTypes.func,

  /**
   * The preferred/target item width. Item width will grow to fill
   * column space, and shrink to fit if below min columns.
   */
  idealItemWidth: React.PropTypes.number,

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
   * The maximum number of columns to display.
   * If not passed in will render the highest amount of columns that can fit.
   */
  maxCols: React.PropTypes.number,

  /**
   * The minimum number of columns to display.
   */
  minCols: React.PropTypes.number,

  /**
   * The scroll container to use. Defaults to window.
   */
  scrollContainer: React.PropTypes.shape({
    addEventListener: React.PropTypes.func,
    removeEventListener: React.PropTypes.func,
  }),
};
