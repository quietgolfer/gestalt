// @flow
/* global React$Element */
import React, { Component, PropTypes } from 'react';
import Box from '../Box/Box';
import Controller from '../FlyoutUtils/Controller';
import MobileFlyout from './MobileFlyout';
import breakpoints from '../breakpoints.json';

type Props = {
  children?: any,
  closeLabel: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  trigger: React$Element<any>,
};

type State = {
  breakpoint: 'xs' | 'sm' | 'md' | 'lg',
  windowHeight: ?number,
};

export default class Flyout extends Component {

  state: State = {
    breakpoint: 'xs',
    windowHeight: undefined,
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateBreakpoint);
    this.updateBreakpoint();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateBreakpoint);
  }

  getCurrentBreakpoint = () => {
    let size = 'xs';
    Object.keys(breakpoints).forEach((point) => {
      if (window.matchMedia(breakpoints[point]).matches) {
        size = point;
      }
    });
    return size;
  }

  updateBreakpoint = () => {
    const size = this.getCurrentBreakpoint();
    if (size !== this.state.breakpoint || window.innerHeight !== this.state.windowHeight) {
      this.setState({ breakpoint: size, windowHeight: window.innerHeight });
    }
  }

  props: Props;

  render() {
    const { children, closeLabel, idealDirection, isOpen, onDismiss, size, trigger } = this.props;

    return this.state.breakpoint === 'xs' ? (
      <MobileFlyout
        closeLabel={closeLabel}
        isOpen={isOpen}
        onDismiss={onDismiss}
        trigger={trigger}
      >
        {children}
      </MobileFlyout>
    ) : (
      <Box xs={{ display: 'inlineBlock' }}>
        <Controller
          bgColor="white"
          closeLabel={closeLabel}
          idealDirection={idealDirection}
          isOpen={isOpen}
          onDismiss={onDismiss}
          shouldFocus
          size={size}
          trigger={trigger}
        >
          {children}
        </Controller>
      </Box>
    );
  }

}

Flyout.propTypes = {
  children: PropTypes.node,
  closeLabel: PropTypes.string.isRequired,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // default: sm
  trigger: PropTypes.node.isRequired,
};
