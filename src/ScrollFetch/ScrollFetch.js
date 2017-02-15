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
    this.check();
  }

  /**
   * Remove listeners when unmounting.
   */
  componentWillUnmount() {
    this.props.container.removeEventListener('scroll', this.check);
  }

  /**
   * Returns the container height.
   */
  getContainerHeight = () => {
    const { container } = this.props;
    return container.clientHeight || container.innerHeight;
  }

  /**
   * Returns the scroll position of the scroll container.
   */
  getScrollPos() {
    const { container } = this.props;
    return container.scrollY !== undefined ? container.scrollY : container.scrollTop;
  }

  scrollBuffer: number;

  /**
   * Fetches additional items if needed.
   */
  check = throttle(() => {
    const { isFetching, fetchMore, renderHeight } = this.props;

    // Only fetch more items if we are not fetching and we have a fetchMore prop.
    if (isFetching || !fetchMore) {
      return;
    }

    const containerHeight = renderHeight || this.getContainerHeight;
    if (this.getScrollPos() + this.scrollBuffer > containerHeight()) {
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
  isFetching: React.PropTypes.bool,
  fetchMore: React.PropTypes.func,
};

ScrollFetch.defaultProps = {
  container: typeof window !== 'undefined' ? window : null,
};
