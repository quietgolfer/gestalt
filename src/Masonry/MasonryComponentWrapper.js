// @flow
import React, { Component } from 'react';

type WrapperProps<T> = {
  isInViewport: boolean,
  component: T
};

export default class MasonryComponentWrapper<T> extends Component {
  static defaultProps: {};

  shouldComponentUpdate(props: WrapperProps<T>) {
    return props.isInViewport === true || this.props.isInViewport !== props.isInViewport;
  }

  render() {
    return this.props.component;
  }
}

MasonryComponentWrapper.propTypes = {
  // Whether the wrapped component is in the viewport
  isInViewport: React.PropTypes.bool.isRequired,

  // The component to render
  component: React.PropTypes.shape({}).isRequired
};
