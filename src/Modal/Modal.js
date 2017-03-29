// @flow
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Divider from '../Divider/Divider';
import Heading from '../Heading/Heading';
import IconButton from '../IconButton/IconButton';
import styles from './Modal.css';
import breakpoints from '../breakpoints.json';
import colors from '../Colors.css';

const SIZE_WIDTH_MAP = {
  sm: 414,
  md: 544,
  lg: 804,
};

const ESCAPE_KEY_CODE = 27;

type Props = {|
  accessibilityCloseLabel: string,
  accessibilityModalLabel: string,
  children?: any,
  footer?: any,
  heading: string,
  onDismiss: () => void,
  role?: 'alertdialog' | 'dialog',
  size?: 'sm' | 'md' | 'lg',
|};

type State = {
  breakpoint: 'xs' | 'sm' | 'md' | 'lg',
  windowHeight: ?number,
};

export default class Modal extends Component {

  state:State = {
    breakpoint: 'xs',
    windowHeight: undefined,
  };

  componentDidMount() {
    document.addEventListener('click', this.handlePageClick);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('resize', this.updateBreakpoint);
    document.addEventListener('focus', this.restrictFocus, true);
    this.priorFocus = document.activeElement;
    this.updateBreakpoint();
    if (document.body) {
      document.body.style.overflow = 'hidden'; // Prevents background scrolling
    }
    this.modal.focus();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handlePageClick);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.updateBreakpoint);
    document.removeEventListener('focus', this.restrictFocus, true);

    if (document.body) {
      document.body.style.overflow = ''; // Reenables background scrolling
    }
    if (this.priorFocus) {
      this.priorFocus.focus();
    }
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

  handleClose = () => {
    this.props.onDismiss();
  }

  handlePageClick = (e: Event) => {
    if (e.target instanceof Node
      && this.container.contains(e.target)
      && !this.modal.contains(e.target)) {
      this.handleClose();
    }
  }

  handleKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      this.handleClose();
    }
  }

  updateBreakpoint = () => {
    const size = this.getCurrentBreakpoint();
    if (size !== this.state.breakpoint || window.innerHeight !== this.state.windowHeight) {
      this.setState({ breakpoint: size, windowHeight: window.innerHeight });
    }
  }

  restrictFocus = (e: Event) => {
    if (e.target instanceof Node && !this.modal.contains(e.target)) {
      e.stopPropagation();
      this.modal.focus();
    }
  }

  props: Props;
  container: HTMLElement;
  modal: HTMLElement;
  priorFocus: ?HTMLElement;

  render() {
    const {
      accessibilityCloseLabel,
      accessibilityModalLabel,
      children,
      footer,
      heading,
      role = 'dialog',
      size = 'sm'
    } = this.props;
    const width = SIZE_WIDTH_MAP[size];

    const container = ['fixed', 'border-box', 'col-12', 'flex', 'justify-center', 'left-0', 'top-0'];
    const containerClasses = this.state.breakpoint === 'xs' ?
      classnames(container, 'items-end', 'bottom-0') : classnames(container, 'items-center', styles.container);

    const wrapper = ['fit', 'relative'];
    const wrapperClasses = this.state.breakpoint === 'xs' ?
      classnames(wrapper, colors.whiteBg, 'm0', 'self-end') : classnames(wrapper, colors.whiteBg, 'my2', 'rounded', styles.wrapper);

    const overlay = ['absolute', 'col-12', 'left-0', 'top-0', 'zoom-out'];
    const overlayClasses = classnames(overlay, styles.overlay, colors.darkGrayBg);

    return (
      <div
        aria-label={accessibilityModalLabel}
        className={containerClasses}
        ref={(c) => { this.container = c; }}
        role={role}
      >
        <div className={overlayClasses} />
        <div
          className={wrapperClasses}
          ref={(c) => { this.modal = c; }}
          tabIndex={-1}
          style={{ width }}
        >
          <div className="flex flex-column relative" style={{ maxHeight: '90vh' }}>
            <div className="border-box fit">
              {role === 'dialog' ?
                <div className="flex py3 justify-center text-center" style={{ paddingLeft: 50, paddingRight: 50 }}>
                  <Heading size="xs" accessibilityLevel={1}>
                    {heading}
                  </Heading>
                </div>
                : <div className="flex py3 px2">
                  <Heading size="lg" accessibilityLevel={1}>
                    {heading}
                  </Heading>
                </div> }
              {role === 'dialog' ?
                <div className="absolute top-0 right-0 p1">
                  <IconButton accessibilityLabel={accessibilityCloseLabel} icon="cancel" onClick={this.handleClose} />
                </div>
              : null }
              {role === 'dialog' ? <Divider /> : null}
            </div>
            <div className="overflow-auto flex-auto relative">
              {children}
            </div>
            <div className="border-box fit">
              {footer ? (
                <div>
                  {role === 'dialog' ? <Divider /> : null}
                  <div className="py3 px2">
                    {footer}
                  </div>
                </div>
              ) : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  accessibilityCloseLabel: PropTypes.string.isRequired,
  footer: PropTypes.node,
  heading: PropTypes.string.isRequired,
  accessibilityModalLabel: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  role: PropTypes.oneOf(['alertdialog', 'dialog']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
