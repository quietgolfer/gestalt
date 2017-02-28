// @flow
import React, { Component, PropTypes } from 'react';
import Box from '../Box/Box';
import classnames from 'classnames';
import styles from './Card.css';

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

  handleBlur = () => this.setState({ focused: false });
  handleFocus = () => { this.setState({ focused: true }); };
  handleMouseEnter = () => this.setState({ hovered: true });
  handleMouseLeave = () => this.setState({ hovered: false });

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
