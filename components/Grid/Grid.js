import React, { Component } from 'react';
import style from './Grid.css';
import raf from '../../lib/raf';

const COLUMN_WIDTH = 236;

// Buffer of pixels before we load more items when scrolling.
// TODO: This should by dynamic, based on the size of the container and resource response time.
const SCROLL_BUFFER = 400;

// Gutter around each item.
const ITEM_MARGIN = 14;

export default class Grid extends Component {

    constructor (props, context) {
        super(props, context);

        // Initially set the number of columns to the minimum, this will be resized to the container size
        // after the component renders.
        this.resetLocalCache(props.minCols);

        // A reference to the item container through this.refs.
        this.itemRefs = [];

        // A reference to grid item heights.
        // This typically doesn't change, so it's good to keep a reference to it here so we don't have to re-measure.
        this.gridItemHeights = [];
    }

    /**
     * Adds hooks after the component mounts.
     */
    componentDidMount () {
        this.boundScrollHandler = () => {
            this.updateVisibility();
            this.fetchMoreIfNeeded();
        };

        this.boundResizeHandler =() => this.handleResize();

        this.props.scrollContainer.addEventListener('scroll', this.boundScrollHandler);
        this.props.scrollContainer.addEventListener('resize', this.boundResizeHandler);
    }

    /**
     * After the component updates we need to position any new nodes that have been appended.
     */
    componentDidUpdate () {
        // If we have new nodes to measure and position, we do this in an animation frame to ensure they
        // exist in the dom.
        // TODO: This currently only handes append operations, also need to handle prepend operations.
        if (this.positionNextIdx - 1 < this.itemRefs.length) {
            raf(() => {
                let didReflow = this.reflowIfNeeded();
                if (!didReflow) {
                    this.positionNewNodes();
                }
            });
        }
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
    resetLocalCache (columnCount) {
        // Sets the columns heights as an array, each member corresponding to a column.
        this.currColHeights = new (window.Uint32Array || window.Array)(columnCount);

        // The next item that we need to position.
        this.positionNextIdx = 0;

        // Whether or not we have requested new items.
        // This is used as a flag to signal that we need to wait before loading additional items.
        this.fetching = false;

        // An array of objects which match up to itemRefs to hold positional information about each item.
        // E.g., {top: 0, bottom: 300}
        this.gridItemPositions = [];

        // The grid left offset, set whenever there's a resize event or when we update.
        this.leftOffset = null;
    }

    /**
     * Reflows items if needed after a resize.
     * We need to reflow items if the number of columns we would display should change,
     * or if the left offset changes.
     */
    reflowIfNeeded () {
        const eachItemWidth = COLUMN_WIDTH + ITEM_MARGIN;
        let newColCount = Math.floor(this.container.clientWidth / eachItemWidth);

        if (newColCount < this.props.minCols) {
            newColCount = this.props.minCols;
        }

        if (newColCount !== this.currColHeights.length || this.leftOffset !== this.determineLeftOffset()) {
            this.resetLocalCache(newColCount);
            this.positionNewNodes();
            this.updateVisibility();
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
        if (!this.props.items.length || this.fetching) {
            return;
        }

        let column = this.shortestColumn();
        let height = this.currColHeights[column];
        if (height - this.getScrollPos() - SCROLL_BUFFER < this.getContainerHeight()) {
            this.fetching = true;
            this.props.loadItems({
                from: this.props.items.length
            });
        }
    }

    /**
     * Update visibility of grid items.
     * For now we naively walk through all items and update visibility based on whether or not they
     * are within a distance of the currently visible area.
     * TODO: Use a O(1) data structure and keep a reference to nodes before and after the scrollable area,
     * only walking as far as needed.
     */
    updateVisibility () {
        let viewTop = this.getScrollPos();
        let viewBottom = this.getContainerHeight() + viewTop;

        for (let i = 0; i < this.gridItemPositions.length; i++) {
            let info = this.gridItemPositions[i];
            if (
                // Hide items which are before the current viewport.
                info.bottom + SCROLL_BUFFER < viewTop ||
                // Hide items which are after the current viewport.
                info.top - SCROLL_BUFFER > viewBottom) {
                this.itemRefs[i].style.display = 'none';
            } else {
                this.itemRefs[i].style.display = '';
            }
        }
    }

    /**
     * Positions nodes which have been rendered to the grid.
     * We position the nodes after rendering so we can have a chance to measure each node.
     */
    positionNewNodes () {
        // Since items are positioned absolutely, we can't rely on margin or padding to center
        // an arbitrary number of columns. Calculate the offset in order to center the grid.
        if (this.leftOffset === null) {
            this.leftOffset = this.determineLeftOffset();
        }

        for (let i = this.positionNextIdx; i < this.itemRefs.length; i++) {
            this.positionNextIdx = i + 1;

            let itemRef = this.itemRefs[i];
            let column = this.shortestColumn();

            // Use the cached item height if we can.
            let height = this.gridItemHeights[i] || itemRef.clientHeight + ITEM_MARGIN;
            this.gridItemHeights[i] = height;

            let top = this.currColHeights[column];

            let itemInfo = {
                top,
                height,
                bottom: top + height
            };

            itemRef.style.top = `${this.currColHeights[column]}px`;
            itemRef.style.left = `${column * COLUMN_WIDTH + ITEM_MARGIN * column + this.leftOffset}px`;

            this.currColHeights[column] += height;

            this.gridItemPositions[i] = itemInfo;
        }
        this.fetching = false;

        // After we position immediately check if we need to fetch more.
        // This catches the case where we exhaust the initial batch of items and need to fill the screen.
        this.fetchMoreIfNeeded();
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
        return this.container.parentNode.clientHeight;
    }

    /**
     * Container width - item width / 2
     */
    determineLeftOffset () {
        return (this.container.clientWidth - this.currColHeights.length * (COLUMN_WIDTH + ITEM_MARGIN)) / 2
            + ITEM_MARGIN / 2;
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

    render () {
        return (
            <div className={style.grid} ref={ref => this.container = ref}>
                {this.props.items.map((item, idx) =>
                    <div className={style.gridItem} key={idx} ref={ref => this.itemRefs[idx] = ref}>
                        {this.props.renderItem(item)}
                    </div>
                )}
            </div>
        );
    }
}

Grid.propTypes = {
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
     * A callback to render a given item object.
     */
    renderItem: React.PropTypes.func,

    /**
     * The scroll container to use. Defaults to window.
     */
    scrollContainer: React.PropTypes.object
};

Grid.defaultProps = {
    minCols: 3,
    scrollContainer: window
};
