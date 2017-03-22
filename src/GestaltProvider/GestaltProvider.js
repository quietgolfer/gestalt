// @flow
import React, { Component } from 'react';
import Box from '../Box/Box';

type Props = {
  children?: any,
};

/**
 * Context provider to see which type of input
 * is interacting with the device: 'key' / 'mouse' / 'touch'
 */
export default class GestaltProvider extends Component {
  static childContextTypes = {
    inputDevice: React.PropTypes.string
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      inputDevice: 'key'
    };
  }

  state: {
    inputDevice: string,
  }

  getChildContext() {
    return {
      inputDevice: this.state.inputDevice
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('mousedown', this.onMouseDown);
    document.addEventListener('touchstart', this.onTouchStart);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('touchstart', this.onTouchStart);
  }

  onKeyDown = () => {
    this.setState({
      inputDevice: 'key'
    });
  }

  onMouseDown = () => {
    this.setState({
      inputDevice: 'mouse'
    });
  }

  onTouchStart = () => {
    this.setState({
      inputDevice: 'touch'
    });
  }

  render() {
    return (
      <Box>
        {this.props.children}
      </Box>
    );
  }
}
