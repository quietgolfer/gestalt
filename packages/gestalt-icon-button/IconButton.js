// @flow
/* global $Keys */
import React, { PropTypes } from 'react';
import Icon from 'gestalt-icon';
import styles from './IconButton.css';
import icons from '../gestalt-icon/icons/index';

type Props = {
  bgColor?: 'transparent' | 'light-gray',
  iconColor?: 'gray' | 'dark-gray' | 'red' | 'blue',
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons provided in gestalt-icon/icons/index.js.
   */
  icon: $Keys<typeof icons>,
  label: string,
  onClick?: () => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
}

const defaultIconButtonIconColors = {
  transparent: 'gray',
  'light-gray': 'gray',
};

const buttonSize = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

export default function IconButton(props: Props) {
  const {
    bgColor = 'transparent',
    iconColor = defaultIconButtonIconColors[bgColor],
    icon,
    label,
    onClick,
    size = 'md',
  } = props;

  const inlineStyle = {
    height: buttonSize[size],
    width: buttonSize[size],
  };

  const iconSize = buttonSize[size] / 2;

  return (
    <button
      aria-label={label}
      className={styles[bgColor]}
      onClick={onClick}
      style={inlineStyle}
    >
      {/*
        We're explicitly setting an empty string as a label on the Icon since we
        already have an aria-label on the button container.
        This is similar to having empty `alt` attributes:
        https://davidwalsh.name/accessibility-tip-empty-alt-attributes
      */}
      <Icon color={iconColor} icon={icon} size={iconSize} label="" />
    </button>
  );
}

IconButton.propTypes = {
  bgColor: PropTypes.oneOf(
    ['transparent', 'light-gray']
  ),
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  iconColor: PropTypes.oneOf(
    ['gray', 'dark-gray', 'red', 'blue']
  ),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(
    ['xs', 'sm', 'md', 'lg', 'xl']
  ),
};
