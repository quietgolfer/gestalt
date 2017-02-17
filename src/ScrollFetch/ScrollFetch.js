// @flow
import React, { Component } from 'react';
import throttle from '../throttle';

export default class ScrollFetch extends Component {
  static defaultProps: {};

  /**
   * Adds scroll listener after the component mounts.
   */
  componentDidMount() {
    this.props.container.addEventListener('scroll', this.check);
  }

  /**
   * Update scroll buffer and check after the component updates.
   */
  componentDidUpdate() {
    this.scrollBuffer = this.scrollBuffer || this.getContainerHeight() * 2;
    // setTimeout so the parent component can calculate renderHeight().
    setTimeout(() => this.check());
  }

  /**
   * Remove listeners when unmounting.
   */
  componentWillUnmount() {
    this.removeScrollListener();
  }

  /**
   * Returns the container height.
   */
  getContainerHeight = () => {
    const { container } = this.props;
    return container.clientHeight !== undefined ?
      container.clientHeight : container.innerHeight;
  }

  /**
   * Returns the scrollable content height.
   */
  getScrollHeight = () => {
    const { container } = this.props;
    return container.scrollHeight !== undefined ?
      container.scrollHeight :
      document.body && document.body.scrollHeight;
  }

  /**
   * Returns the scroll position of the scroll container.
   */
  getScrollPos() {
    const { container } = this.props;
    if (container.scrollY !== undefined) {
      // Modern browser.
      return container.scrollY;
    } else if (container.scrollTop !== undefined) {
      // Non-window container elements.
      return container.scrollTop;
    } else if (document.documentElement && document.documentElement.scrollTop !== undefined) {
      // IE support.
      return document.documentElement.scrollTop;
    }
    return 0;
  }

  /**
   * Removes the scroll event listener
   */
  removeScrollListener() {
    this.props.container.removeEventListener('scroll', this.check);
  }

  scrollBuffer: number;

  /**
   * Fetches additional items if needed.
   */
  check = throttle(() => {
    const { isAtEnd, isFetching, fetchMore, renderHeight } = this.props;
    // Remove event listener if there are no more items to fetch
    if (isAtEnd) {
      this.removeScrollListener();
      return;
    }

    // Only fetch more items if we are not fetching and we have a fetchMore prop.
    if (isFetching || !fetchMore) {
      return;
    }

    const scrollHeight = renderHeight || this.getScrollHeight;
    if (this.getScrollPos() + this.scrollBuffer > scrollHeight()) {
      fetchMore();
    }
  })

  render() {
    return null;
  }
}

ScrollFetch.propTypes = {
  /**
   * The scroll container to use. Defaults to window.
   */
  container: React.PropTypes.shape({
    addEventListener: React.PropTypes.func,
    removeEventListener: React.PropTypes.func,
  }),
  renderHeight: React.PropTypes.func,
  isAtEnd: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  fetchMore: React.PropTypes.func,
};

ScrollFetch.defaultProps = {
  container: typeof window !== 'undefined' ? window : null,
};
