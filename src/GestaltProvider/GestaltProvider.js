// @flow
import React, { Component } from 'react';
import Box from '../Box/Box';

type Props = {|
  children?: any,
|};

type State = {
  inputDevice: string,
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

  state: State;

  getChildContext() {
    return {
      inputDevice: this.state.inputDevice,
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.state.inputDevice !== nextState.inputDevice;
  }

  onKeyDown = () => {
    this.setState({
      inputDevice: 'key',
    });
  }

  onMouseDown = () => {
    this.setState({
      inputDevice: 'mouse',
    });
  }

  onTouchStart = () => {
    this.setState({
      inputDevice: 'touch',
    });
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
