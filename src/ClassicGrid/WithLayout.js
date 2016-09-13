import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class WithLayout extends Component {
  constructor(props, context) {
    super(props, context);
    if (typeof document !== 'undefined') {
      this.measuringNode = document.createElement('div');
    }
    this.state = {
      cache: null,
    };
  }

  componentDidMount() {
    if (this.props.layoutReady) {
      this.renderToCache();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.layoutReady && this.props.invalidateCacheKey !== nextProps.invalidateCacheKey) {
      this.renderToCache(true);
    }
  }

  renderToCache(invalidate) {
    // If we don't have the item in cache yet, render it.
    if (!this.state.cache || invalidate) {
      // Append a temporary node to the dom to measure it.
      document.body.appendChild(this.measuringNode);
      const child = this.props.children();
      const rendered = ReactDOM.unstable_renderSubtreeIntoContainer(
          this, child, this.measuringNode);
      const { clientWidth, clientHeight } = rendered;
      ReactDOM.unmountComponentAtNode(this.measuringNode);
      document.body.removeChild(this.measuringNode);

      // Trigger the prop fn to determine layout using layout information.
      let processedLayoutInfo;
      if (typeof document === 'undefined') {
        processedLayoutInfo = { top: 0, left: 0 };
      } else {
        processedLayoutInfo = this.props.processInfo(this.props.data, clientWidth, clientHeight);
      }

      this.setState({
        cache: this.props.children(processedLayoutInfo),
      });
    }
  }

  render() {
    if (this.state.cache) {
      return this.state.cache;
    }

    // Return nothing until we're ready to render.
    return this.props.children();
  }
}

WithLayout.propTypes = {
  /**
   * A function to render the child with layout information.
   */
  children: React.PropTypes.func,

  /**
   * Item renderer data.
   */
  data: React.PropTypes.object,

  /**
   * Change this value to invalidate render cache.
   */
  invalidateCacheKey: React.PropTypes.any,

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
