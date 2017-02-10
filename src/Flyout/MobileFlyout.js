// @flow
/* global React$Element */
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import IconButton from '../IconButton/IconButton';
import styles from './MobileFlyout.css';

const ESCAPE_KEY_CODE = 27;

type Props = {
  children?: any,
  closeLabel: string,
  isOpen: boolean,
  onDismiss: () => void,
  trigger: React$Element<any>,
};


export default class MobileFlyout extends Component {
  componentDidMount() {
    document.addEventListener('click', this.handlePageClick);
    window.addEventListener('keydown', this.handleKeyDown);
  }


  componentWillUnmount() {
    document.removeEventListener('click', this.handlePageClick);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  props: Props;
  flyout: HTMLElement;
  triggerButton: HTMLElement;

  handleKeyDown = (e: { keyCode: number }) => {
    if (e.keyCode === ESCAPE_KEY_CODE) {
      this.props.onDismiss();
    }
  }

  handlePageClick = (e: Event) => {
    if (e.target instanceof Node && this.props.isOpen
      && !this.triggerButton.contains(e.target) && !this.flyout.contains(e.target)) {
      this.props.onDismiss();
    }
  }

  render() {
    const { children, closeLabel, isOpen, onDismiss, trigger } = this.props;
    return (
      <div className="inline-block">
        <div ref={(c) => { this.triggerButton = c; }}>
          {trigger}
        </div>
        <div>
          {isOpen ? (
            <div>
              <div className={cx('fixed', 'left-0', 'top-0', 'zoom-out', styles['MobileFlyout-overlay'])} />
              <div
                className={cx('bg-white', 'block', 'border', 'border-box', 'bottom-0', 'fixed', 'left-0', styles.MobileFlyout, 'overflow-scroll')}
                ref={(c) => { this.flyout = c; }}
              >
                <div className={cx('pull-right')}>
                  <IconButton icon="cancel" label={closeLabel} onClick={onDismiss} />
                </div>
                {children}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

MobileFlyout.propTypes = {
  children: PropTypes.node,
  closeLabel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  trigger: PropTypes.node.isRequired,
};
