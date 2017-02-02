// @flow
/* global React$Element */
import React, { Component, PropTypes } from 'react';
import InnerFlyout from './InnerFlyout';

type Props = {
  children?: any,
  closeLabel: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
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

export default class Flyout extends Component {
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
  triggerButton: HTMLElement;
  innerFlyout: HTMLElement;

  handleKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      this.props.onDismiss();
    }
  }

  handlePageClick = (e: Event) => {
    if (e.target instanceof Node
      && !this.triggerButton.contains(e.target) && !this.innerFlyout.contains(e.target)) {
      this.props.onDismiss();
    }
  }

  updateTriggerRect = () => {
    const triggerBoundingRect = this.triggerButton.getBoundingClientRect();
    this.setState({ triggerBoundingRect });
  }

  render() {
    const { children, closeLabel, idealDirection, isOpen, trigger } = this.props;
    const size = this.props.size ? this.props.size : 'sm';
    const width = SIZE_WIDTH_MAP[size];
    return (
      <div className="inline-block">
        <div ref={(c) => { this.triggerButton = c; }}>
          {trigger}
        </div>
        <div ref={(c) => { this.innerFlyout = c; }}>
          {isOpen && this.triggerButton ?
            <InnerFlyout
              closeLabel={closeLabel}
              idealDirection={idealDirection}
              onClick={this.handlePageClick}
              onDismiss={this.props.onDismiss}
              onKeyDown={this.handleKeyDown}
              onResize={this.updateTriggerRect}
              triggerRect={this.state.triggerBoundingRect}
              width={width}
            >
              {children}
            </InnerFlyout>
          : null
        }
        </div>
      </div>
    );
  }
}

Flyout.propTypes = {
  children: PropTypes.node,
  closeLabel: PropTypes.string.isRequired,  // needed for accessibility  and internationalization
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // default: sm
  trigger: PropTypes.node.isRequired,
};
