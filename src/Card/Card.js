// @flow
import React, { Component, PropTypes } from 'react';
import Box from '../Box/Box';
import classnames from 'classnames';
import styles from './Card.css';

const HOVER_DELAY = 80;

export default class Card extends Component {
  static PropTypes = {
    ariaLabel: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  static props: {
    ariaLabel: String,
    children?: any
  }

  state = {
    focused: false,
    hovered: false
  };

  hoverTimer: number;

  handleBlur = () => this.setState({ focused: false });
  handleFocus = () => { this.setState({ focused: true }); };
  handleMouseEnter = () => this.handleHoverChange(true);
  handleMouseLeave = () => this.handleHoverChange(false);

  handleHoverChange = (hovered: boolean) => {
    clearTimeout(this.hoverTimer);
    this.hoverTimer = setTimeout(() => {
      if (hovered === this.state.hovered) {
        return;
      }
      this.setState({ hovered });
    }, HOVER_DELAY);
  }

  render() {
    const {
      ariaLabel,
      children
    } = this.props;

    const {
      focused,
      hovered
    } = this.state;

    const classes = classnames(styles.card, {
      [styles.hover]: hovered,
      [styles.focus]: focused,
    });

    return (
      <Box
        aria-label={ariaLabel}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        position="relative"
        tabIndex="0"
      >
        <div className={classes} />
        {children}
      </Box>
    );
  }
}
