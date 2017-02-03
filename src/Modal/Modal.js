// @flow
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import Divider from '../Divider/Divider';
import IconButton from '../IconButton/IconButton';
import styles from './Modal.css';

const breakpoints = require('../breakpoints');

const cx = classnames.bind(styles);

const SIZE_WIDTH_MAP = {
  sm: 435,
  md: 544,
  lg: 800,
};

const ESCAPE_KEY_CODE = 27;

type Props = {
  children?: any,
  closeLabel: string,
  footer?: any,
  header: any,
  modalLabel: string,
  onDismiss: () => void,
  role?: 'alertdialog' | 'dialog',
  size?: 'sm' | 'md' | 'lg',
};

type State = {
  breakpoint: 'xs' | 'sm' | 'md' | 'lg',
  windowHeight: number,
};

export default class Modal extends Component {

  state:State = {
    breakpoint: 'xs',
    windowHeight: window.innerHeight,
  };

  componentDidMount() {
    document.addEventListener('click', this.handlePageClick);
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('resize', this.updateBreakpoint);
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

  props: Props;
  modal: HTMLElement;
  priorFocus: ?HTMLElement;
  header: HTMLElement;
  footer: HTMLElement;
  content: HTMLElement;

  render() {
    const { children, closeLabel, footer, header, modalLabel, role = 'dialog', size = 'sm' } = this.props;
    const width = SIZE_WIDTH_MAP[size];

    const container = ['fixed', 'border-box', 'col-12', 'flex', 'justify-center', 'left-0', 'top-0'];
    const containerClasses = this.state.breakpoint === 'xs' ?
      cx(container, 'items-end', 'bottom-0') : cx(container, 'items-center', 'Modal-container');

    const wrapper = ['bg-white', 'fit', 'relative', 'rounded'];
    const wrapperClasses = this.state.breakpoint === 'xs' ?
      cx(wrapper, 'm0', 'self-end', 'Modal-wrapper-xs') : cx(wrapper, 'my2', 'Modal-wrapper');

    const overlay = ['absolute', 'bg-dark-gray', 'col-12', 'left-0', 'top-0', 'zoom-out'];
    const overlayClasses = cx(overlay, 'Modal-overlay');

    return (
      <div
        aria-label={modalLabel}
        className={containerClasses}
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
            <div className="border-box fit" ref={(c) => { this.header = c; }}>
              <div className="flex py3 px2 justify-between">
                {header}
                {role === 'dialog' ? <IconButton label={closeLabel} icon="cancel" onClick={this.handleClose} /> : null }
              </div>
              {role === 'dialog' ? <Divider /> : null}
            </div>
            <div className="overflow-auto flex-auto relative" ref={(c) => { this.content = c; }}>
              {children}
            </div>
            <div className="border-box fit" ref={(c) => { this.footer = c; }}>
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
  closeLabel: PropTypes.string.isRequired,
  footer: PropTypes.node,
  header: PropTypes.node.isRequired,
  modalLabel: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  role: PropTypes.oneOf(['alertdialog', 'dialog']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
