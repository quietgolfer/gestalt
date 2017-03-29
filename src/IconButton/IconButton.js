// @flow
/* eslint-disable react/no-unused-prop-types */
/* global $Keys */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import styles from './IconButton.css';
import icons from '../Icon/icons';

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

const defaultIconButtonIconColors = {
  transparent: 'gray',
  lightGray: 'gray',
};

const buttonSize = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

type GestaltContext = {
  inputDevice: '' | 'key' | 'mouse' | 'touch'
}

export default function IconButton(props: Props, context: GestaltContext) {
  const {
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    bgColor = 'transparent',
    iconColor = defaultIconButtonIconColors[bgColor],
    icon,
    onClick,
    size = 'md',
    tabIndex,
  } = props;

  const { inputDevice = 'key' } = context;

  const inlineStyle = {
    height: buttonSize[size],
    width: buttonSize[size],
  };

  const iconSize = buttonSize[size] / 2;

  return (
    <button
      aria-expanded={accessibilityExpanded}
      aria-haspopup={accessibilityHaspopup}
      aria-label={accessibilityLabel}
      className={classnames(
        styles.button,
        styles[bgColor], {
          [styles.disableFocusOutline]: inputDevice !== 'key'
        }
      )}
      onClick={onClick}
      style={inlineStyle}
      tabIndex={tabIndex}
    >
      <Box xs={{ display: 'flex' }} alignItems="center" justifyContent="center">
        {/*
          We're explicitly setting an empty string as a label on the Icon since we
          already have an aria-label on the button container.
          This is similar to having empty `alt` attributes:
          https://davidwalsh.name/accessibility-tip-empty-alt-attributes
        */}
        <Icon color={iconColor} icon={icon} size={iconSize} accessibilityLabel="" />
      </Box>
    </button>
  );
}

IconButton.contextTypes = {
  inputDevice: React.PropTypes.string
};

IconButton.propTypes = {
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
