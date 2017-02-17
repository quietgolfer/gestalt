// @flow
/* global React$Element */
import React, { Component, PropTypes } from 'react';
import Contents from './Contents';

type Props = {
  bgColor: 'dark-gray' | 'white' | 'yellow',
  children?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
  shouldFocus?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  trigger: React$Element<any>,
};

const SIZE_WIDTH_MAP = {
  xs: 185,
  sm: 230,
  md: 320,
  lg: 350,
  xl: 496,
};

const ESCAPE_KEY_CODE = 27;

type ClientRect = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
};

type State = {
  triggerBoundingRect: ClientRect,
}

export default class Controller extends Component {
  state:State = {
    triggerBoundingRect: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    },
  };

  componentDidMount() {
    this.updateTriggerRect();
  }

  componentWillReceiveProps() {
    this.updateTriggerRect();
  }

  props: Props;
  triggerWrapper: HTMLElement;
  contents: HTMLElement;

  handleKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      this.props.onDismiss();
    }
  }

  handlePageClick = (e: Event) => {
    if (e.target instanceof Node
      && !this.triggerWrapper.contains(e.target) && !this.contents.contains(e.target)) {
      this.props.onDismiss();
    }
  }

  updateTriggerRect = () => {
    const triggerBoundingRect = this.triggerWrapper.getBoundingClientRect();
    this.setState({ triggerBoundingRect });
  }

  render() {
    const { bgColor, children, idealDirection, isOpen, shouldFocus, trigger } = this.props;
    const size = this.props.size ? this.props.size : 'sm';
    const width = SIZE_WIDTH_MAP[size];
    return (
      <div>
        <div ref={(c) => { this.triggerWrapper = c; }}>
          {trigger}
        </div>
        <div ref={(c) => { this.contents = c; }}>
          {isOpen && this.triggerWrapper ?
            <Contents
              bgColor={bgColor}
              idealDirection={idealDirection}
              onClick={this.handlePageClick}
              onKeyDown={this.handleKeyDown}
              onResize={this.updateTriggerRect}
              shouldFocus={shouldFocus}
              triggerRect={this.state.triggerBoundingRect}
              width={width}
            >
              {children}
            </Contents>
          : null
        }
        </div>
      </div>
    );
  }
}

Controller.propTypes = {
  bgColor: PropTypes.oneOf(['dark-gray', 'white', 'yellow']),
  children: PropTypes.node,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  shouldFocus: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // default: sm
  trigger: PropTypes.node.isRequired,
};
