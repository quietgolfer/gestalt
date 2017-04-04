// @flow
/* global $Keys */
import React from 'react';
import classnames from 'classnames';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import icons from '../Icon/icons';
import styles from './Pog.css';


type Props = {|
  active?: boolean,
  bgColor?: 'transparent' | 'lightGray',
  focused?: boolean,
  hovered?: boolean,
  iconColor?: 'gray' | 'darkGray' | 'red' | 'blue',
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons provided in gestalt-icon/icons/index.js.
   */
  icon: $Keys<typeof icons>,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|}

const defaultIconButtonIconColors = {
  transparent: 'gray',
  lightGray: 'gray',
};

const sizes = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 56,
};

export default function Pog(props: Props) {
  const {
    active = false,
    bgColor = 'transparent',
    focused = false,
    hovered = false,
    iconColor = defaultIconButtonIconColors[bgColor],
    icon,
    size = 'md',
  } = props;

  const iconSize = sizes[size] / 2;

  const inlineStyle = {
    height: sizes[size],
    width: sizes[size],
  };

  const classes = classnames(
    styles.pog,
    styles[bgColor], {
      [styles.active]: active,
      [styles.focused]: focused,
      [styles.hovered]: hovered && !focused && !active,
    }
  );

  return (
    <div
      className={classes}
      style={inlineStyle}
    >
      <Box shape="circle">
        {/*
          We're explicitly setting an empty string as a label on the Icon since we
          already have an aria-label on the button container.
          This is similar to having empty `alt` attributes:
          https://davidwalsh.name/accessibility-tip-empty-alt-attributes
        */}
        <Icon color={iconColor} icon={icon} size={iconSize} accessibilityLabel="" />
      </Box>
    </div>
  );
}
