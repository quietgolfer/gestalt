// @flow
/* eslint react/no-find-dom-node: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Packer from './Packer';
import ScrollFetch from '../ScrollFetch/ScrollFetch';
import styles from './Grid.css';
import WithLayout from './WithLayout';

type Props<T> = {|
  comp: () => void,
  items: T[],
  maxItemWidth: number,
  minItemWidth: number,
  loadItems: () => void,
  scrollContainer: HTMLElement,
|};

export default class BoxGrid extends Component {
  static defaultProps: {};

  constructor(props: Props<*>) {
    super(props);

    this.packer = new Packer();

    this.setCacheKey();
    this.gridWrapperHeight = 0;

    this.state = {
      fetchingFrom: false,
      gridWidth: 0,
      itemWidth: 0,
      layoutReady: false,
    };
  }

  state: {
    fetchingFrom: bool | number,
    gridWidth: number,
    itemWidth: number,
    layoutReady: bool
  };

  /**
   * Adds hooks after the component mounts.
   */
  componentDidMount() {
    // We calculate columns and offset after the component mounts so we can measure our container.
    this.calculateColumns();
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

  componentDidUpdate() {
    setTimeout(() => {
      const longestColumn = this.highestColumn();
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
    this.cacheKey = `${this.state && this.state.gridWidth} - ${Date.now()}`;
  }

  boundResizeHandler: () => void;
  cacheKey: string;
  gridWrapper: HTMLElement;
  gridWrapperHeight: number;
  packer: Packer;
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
    const colConfig = this.calculateColumns();

    // Reset root node and re-render
    this.packer.init(colConfig);

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
  calculateColumns(): {
    colCount: number,
    gridWidth: number,
    itemWidth: number,
  } {
    /* eslint react/no-find-dom-node: 0 */
    const el = ReactDOM.findDOMNode(this);
    if (el && el.parentNode instanceof HTMLElement) {
      const gridWidth = el.parentNode.clientWidth;

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
    throw new Error('could not calculate columns');
  }

  /**
   * Reflows items if needed after a resize.
   * We need to reflow items if the number of columns we would display should change.
   */
  reflowIfNeeded() {
    const el = ReactDOM.findDOMNode(this);
    if (el && el.parentNode instanceof HTMLElement) {
      const gridWidth = el.parentNode.clientWidth;
      this.setState({
        // Recalculate width with new col count.
        gridWidth,
      }, () => {
        // Reflow after setting grid width, needed for calculating columns.
        this.reflow(this.calculateColumns());
      });
    }
  }

  /**
   * Use the item endY or highest available startY to find the grid height.
   */
  highestColumn = () => {
    let height = 0;
    for (let i = 0; i < this.packer.columns.length; i += 1) {
      const item = this.packer.columns[i][this.packer.columns[i].length - 1];
      if (item.endY != null && item.endY > height) {
        height = item.endY;
      } else if (item.startY > height) {
        height = item.startY;
      }
    }
    return height;
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
    const { top, left, renderedColSpan } = this.packer.position(
      width,
      height,
      // TODO: Find a better way to extract child column count from the component.
      parseInt(element.children[0].dataset.cols, 10)
    );

    /* eslint no-param-reassign: 0 */
    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
    element.style.width = `${this.state.itemWidth * renderedColSpan}px`;
    element.className = styles.Grid__Item;
  }

  render() {
    return (
      <div
        className={styles.Grid}
        ref={(ref) => { this.gridWrapper = ref; }}
      >
        <ScrollFetch
          container={this.props.scrollContainer}
          fetchMore={this.fetchMore}
          isFetching={this.state.fetchingFrom !== false}
          renderHeight={this.highestColumn}
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
