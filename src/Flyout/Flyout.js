// @flow
/* global React$Element */
import React, { Component, PropTypes } from 'react';
import InnerFlyout from './InnerFlyout';

type Props = {
  children?: any,
  closeLabel: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  trigger: () => React$Element<any>,
};

// TODO: get input from design on these sizes
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
  isOpen: bool,
  flyoutContent: ?Node,
  triggerBoundingRect: ClientRect,
}

export default class Flyout extends Component {

  state:State = {
    isOpen: false,
    flyoutContent: null,
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
    document.addEventListener('click', this.handlePageClick);
    window.addEventListener('resize', this.updateTriggerRect);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handlePageClick);
    window.removeEventListener('resize', this.updateTriggerRect);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  props: Props;
  triggerButton: HTMLElement;
  innerFlyout: HTMLElement;

  handleKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      this.setState({ isOpen: false });
    }
  }

  handlePageClick = (e: Event) => {
    if (e.target instanceof Node
      && !this.triggerButton.contains(e.target) && !this.innerFlyout.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  };

  handleTriggerClick = () => {
    this.updateTriggerRect();
    this.setState({ isOpen: !this.state.isOpen });
  }

  updateTriggerRect = () => {
    const triggerBoundingRect = this.triggerButton.getBoundingClientRect();
    this.setState({ triggerBoundingRect });
  }

  render() {
    const { children, closeLabel, idealDirection, trigger } = this.props;
    const size = this.props.size ? this.props.size : 'sm';
    const width = SIZE_WIDTH_MAP[size];
    return (
      <div className="inline-block">
        <div ref={(c) => { this.triggerButton = c; }}>
          {trigger(this.handleTriggerClick)}
        </div>
        <div ref={(c) => { this.innerFlyout = c; }}>
          {this.state.isOpen ?
            <InnerFlyout
              closeLabel={closeLabel}
              idealDirection={idealDirection}
              onClick={() => this.setState({ isOpen: false })}
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
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // default: sm
  trigger: PropTypes.func.isRequired,
};
