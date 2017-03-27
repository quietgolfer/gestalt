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
    inputDevice: React.PropTypes.string,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      inputDevice: 'key',
    };
  }

  state: {
    inputDevice: string,
  }

  getChildContext() {
    return {
      inputDevice: this.state.inputDevice,
    };
  }

  onKeyDown = () => {
    if (this.state.inputDevice !== 'key') {
      this.setState({
        inputDevice: 'key',
      });
    }
  }

  onMouseDown = () => {
    if (this.state.inputDevice !== 'mouse') {
      this.setState({
        inputDevice: 'mouse',
      });
    }
  }

  onTouchStart = () => {
    if (this.state.inputDevice !== 'touch') {
      this.setState({
        inputDevice: 'touch',
      });
    }
  }

  render() {
    return (
      <Box
        onKeyDown={this.onKeyDown}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onTouchStart}
      >
        {this.props.children}
      </Box>
    );
  }
}
