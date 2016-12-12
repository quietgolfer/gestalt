import React, { Component } from 'react';

export default class WithLayout extends Component {
  constructor(props, context) {
    super(props, context);
    if (typeof document !== 'undefined') {
      this.measuringNode = document.createElement('div');
    }
    this.lastProcessedIdx = 0;
  }

  componentDidUpdate() {
    if (this.props.layoutReady && this.props.invalidateCacheKey !== this.lastInvalidateCacheKey) {
      this.lastProcessedIdx = 0;
      this.lastInvalidateCacheKey = this.props.invalidateCacheKey;
      this.renderToCache();
    } else if (this.props.data.length > this.lastProcessedIdx) {
      this.renderToCache();
    }
  }

  renderToCache() {
    if (this.props.data.length > this.lastProcessedIdx) {
      // Append a temporary node to the dom to measure it.
      document.body.appendChild(this.measuringNode);

      // Measure all items at once.
      const allItemMeasurements = [];
      for (let i = 0; i < this.childRefs.children.length; i += 1) {
        const child = this.childRefs.children[i];
        allItemMeasurements.push([child.clientWidth, child.clientHeight]);
      }

      // Batch update items with processInfo().
      for (let i = this.lastProcessedIdx; i < this.childRefs.children.length; i += 1) {
        const child = this.childRefs.children[i];
        this.props.processInfo(child, allItemMeasurements[i][0], allItemMeasurements[i][1]);
      }
      this.lastProcessedIdx = this.childRefs.children.length;
    }
  }

  render() {
    if (this.props.data.length === 0) {
      return null;
    }

    return <div ref={(ref) => { this.childRefs = ref; }}>{this.props.children}</div>;
  }
}

WithLayout.propTypes = {
  /**
   * A function to render the child with layout information.
   */
  children: React.PropTypes.arrayOf(React.PropTypes.node),

  /**
   * Item renderer data.
   */
  data: React.PropTypes.arrayOf(React.PropTypes.shape({})),

  /**
   * Change this value to invalidate render cache.
   */
  invalidateCacheKey: React.PropTypes.string,

  /**
   * Whether or not we are ready to measure the layout of the children.
   * This component will not measure the node until notified by this prop.
   */
  layoutReady: React.PropTypes.bool,

  /**
   * Processes rendered layout information.
   */
  processInfo: React.PropTypes.func,
};
