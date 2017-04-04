// @flow
/* eslint-disable react/no-unused-prop-types */
/* global $Keys */
import React, { Component, PropTypes } from 'react';
import styles from './IconButton.css';
import icons from '../Icon/icons';
import Pog from '../Pog/Pog';

type Props = {|
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel: string,
  bgColor?: 'transparent' | 'lightGray',
  iconColor?: 'gray' | 'darkGray' | 'red' | 'blue',
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons provided in gestalt-icon/icons/index.js.
   */
  icon: $Keys<typeof icons>,
  onClick?: () => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  tabIndex?: -1 | 0,
|}

export default class IconButton extends Component {

  static propTypes = {
    accessibilityExpanded: PropTypes.bool,
    accessibilityHaspopup: PropTypes.bool,
    accessibilityLabel: PropTypes.string.isRequired,
    bgColor: PropTypes.oneOf(
      ['transparent', 'lightGray']
    ),
    icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
    iconColor: PropTypes.oneOf(
      ['gray', 'darkGray', 'red', 'blue']
    ),
    onClick: PropTypes.func,
    size: PropTypes.oneOf(
      ['xs', 'sm', 'md', 'lg', 'xl']
    ),
    tabIndex: PropTypes.oneOf([-1, 0]),
  };

  static props: Props;

  state = {
    active: false,
    focused: false,
    hovered: false,
  };

  handleBlur = () => this.setState({ focused: false });
  handleFocus = () => { this.setState({ focused: true }); };
  handleMouseDown = () => { this.setState({ active: true }); };
  handleMouseEnter = () => { this.setState({ hovered: true }); };
  handleMouseLeave = () => { this.setState({ hovered: false }); };
  handleMouseUp = () => { this.setState({ active: false }); };

  render() {
    const {
      accessibilityExpanded,
      accessibilityHaspopup,
      accessibilityLabel,
      bgColor,
      iconColor,
      icon,
      size,
      onClick,
      tabIndex,
    } = this.props;

    const {
      active,
      focused,
      hovered,
    } = this.state;

    const pogProps = {
      active,
      bgColor,
      focused,
      hovered,
      iconColor,
      icon,
      size,
    };

    return (
      <button
        aria-expanded={accessibilityExpanded}
        aria-haspopup={accessibilityHaspopup}
        aria-label={accessibilityLabel}
        className={styles.button}
        onBlur={this.handleBlur}
        onClick={onClick}
        onFocus={this.handleFocus}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        tabIndex={tabIndex}
      >
        <Pog {...pogProps} />
      </button>
    );
  }
}
