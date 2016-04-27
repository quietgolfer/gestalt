import React, { Component } from 'react';
import styles from './Grid.css';
import WithLayout from './WithLayout';

const COLUMN_WIDTH = 236;

// Buffer of pixels before we load more items when scrolling.
// TODO: This should by dynamic, based on the size of the container and resource response time.
const SCROLL_BUFFER = 400;

// Gutter around each item.
const ITEM_MARGIN = 14;

export default class Grid extends Component {

    constructor (props, context) {
        super(props, context);

        this.currColHeights = [];
        this.setCacheKey();

        this.state = {
            leftOffset: 0
        };
    }

    /**
     * Adds hooks after the component mounts.
     */
    componentDidMount () {
        this.boundScrollHandler = () => {
            this.fetchMoreIfNeeded();
        };

        this.boundResizeHandler = () => this.handleResize();

        this.props.scrollContainer.addEventListener('scroll', this.boundScrollHandler);
        this.props.scrollContainer.addEventListener('resize', this.boundResizeHandler);

        // We calculate columns and offset after the component mounts in order to support server rendering.
        // Initially set the number of columns to the minimum, this will be resized to the container size
        // after the component renders.
        this.reflow(this.calculateColumns());

        this.setState({
            // Since items are positioned absolutely, we can't rely on margin or padding to center
            // an arbitrary number of columns. Calculate the offset in order to center the grid.
            leftOffset: this.determineLeftOffset()
        });
    }

    /**
     * Remove listeners when unmounting.
     */
    componentWillUnmount () {
        this.props.scrollContainer.removeEventListener('scroll', this.boundScrollHandler);
        this.props.scrollContainer.removeEventListener('resize', this.boundResizeHandler);
    }

    /**
     * Delays resize handling in case the scroll container is still being resized.
     */
    handleResize () {
        if (this._resizeTimeout) {
            clearTimeout(this._resizeTimeout);
            this._resizeTimeout = null;
        }
        this._resizeTimeout = setTimeout(this.reflowIfNeeded.bind(this), 100);
    }

    /**
     * Resets the local cache.
     */
    reflow (columnCount) {
        columnCount = columnCount || this.calculateColumns();

        // Sets the columns heights as an array, each member corresponding to a column.
        if (typeof document === 'undefined') {
            this.currColHeights = [];
        } else {
            this.currColHeights = new (self.Uint32Array || self.Array)(columnCount);
        }
        this.setCacheKey();

        // Whether or not we have requested new items.
        // This is used as a flag to signal that we need to wait before loading additional items.
        this.fetchingWith = false;
    }

    /**
     * Sets a cache key based on the number of columns and a timestamp.
     * This is consumed by the WithLayout component to cache grid item layout.
     */
    setCacheKey () {
        this.cacheKey = this.currColHeights.length + '-' + Date.now();
    }

    /**
     * Determines the number of columns to display.
     */
    calculateColumns () {
        const eachItemWidth = COLUMN_WIDTH + ITEM_MARGIN;
        const scroller = this.props.scrollContainer;
        let newColCount = Math.floor((scroller.clientWidth || scroller.innerWidth) / eachItemWidth);

        if (newColCount < this.props.minCols) {
            newColCount = this.props.minCols;
        }
        return newColCount;
    }

    /**
     * Reflows items if needed after a resize.
     * We need to reflow items if the number of columns we would display should change,
     * or if the left offset changes.
     */
    reflowIfNeeded () {
        let newColCount = this.calculateColumns();
        let leftOffset = this.determineLeftOffset();

        if (newColCount !== this.currColHeights.length || this.state.leftOffset !== leftOffset) {
            this.reflow(newColCount);
            // Recalculate left offset with new col count.
            this.setState({leftOffset: this.determineLeftOffset()});
            this.forceUpdate();
            return true;
        }
        return false;
    }

    /**
     * Fetches additional items if needed.
     */
    fetchMoreIfNeeded () {
        // Only fetch more items if we already have some items loaded.
        // The initial render should be supplied through props.
        if (!this.props.items.length || this.fetchingWith) {
            return;
        }

        let column = this.shortestColumn();
        let height = this.currColHeights[column];

        if (height - this.getScrollPos() - SCROLL_BUFFER < this.getContainerHeight()) {
            this.fetchingWith = this.props.items.length;
            this.props.loadItems({
                from: this.props.items.length
            });
        }
    }

    /**
     * Returns the scroll position of the scroll container.
     */
    getScrollPos () {
        // Try accessing scrollY, as the grid will generally be scrolled by the window.
        let el = this.props.scrollContainer;
        return el.scrollY !== undefined ?  el.scrollY : el.scrollTop;
    }

    /**
     * Returns the container height.
     */
    getContainerHeight  () {
        let container = this.props.scrollContainer;
        return container.clientHeight || container.innerHeight;
    }

    /**
     * Container width - item width / 2
     */
    determineLeftOffset () {
        let scroller = this.props.scrollContainer;
        let containerWidth = scroller.clientWidth || scroller.innerWidth;
        return (containerWidth - this.currColHeights.length * (COLUMN_WIDTH + ITEM_MARGIN)) / 2;
    }

    /**
     * Returns the index of the shortest column.
     */
    shortestColumn () {
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
    processInfo (data, width, height) {
        let column = this.shortestColumn();
        let top = this.currColHeights[column];
        let left = column * COLUMN_WIDTH + ITEM_MARGIN * column;
        this.currColHeights[column] += height + ITEM_MARGIN;

        return {
            top,
            left
        };
    }

    render () {
        if (this.fetchingWith !== false && this.fetchingWith !== this.props.items.length) {
            this.fetchingWith = false;
        }

        return (
            <div className={styles.Grid} ref={ref => this.container = ref} style={{left: this.state.leftOffset}}>
                {this.props.items.map((item, idx) =>
                    <WithLayout
                        data={item}
                        invalidateCacheKey={this.cacheKey}
                        key={idx}
                        processInfo={this.processInfo.bind(this)}>
                    {
                        (position = {left: 0, top: 0}) => <div
                            className={styles['Grid__Item']}
                            key={idx}
                            style={{top: position.top, left: position.left}}>
                            <this.props.comp data={item} itemIdx={idx} />
                        </div>
                    }
                    </WithLayout>
                )}
            </div>
        );
    }
}

Grid.propTypes = {
    /**
     * The component to render.
     */
    comp: React.PropTypes.func,

    /**
     * An array of all objects to display in the grid.
     */
    items: React.PropTypes.array,

    /**
     * A callback which the grid calls when we need to load more items as the user scrolls.
     * The callback should update the state of the items, and pass those in as props to this component.
     */
    loadItems: React.PropTypes.func,

    /**
     * Minimum number of columns to display.
     */
    minCols: React.PropTypes.number,

    /**
     * The scroll container to use. Defaults to window.
     */
    scrollContainer: React.PropTypes.object
};

Grid.defaultProps = {
    minCols: 3,
    scrollContainer: typeof window !== 'undefined' ? window : null
};
