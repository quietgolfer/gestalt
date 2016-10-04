// @flow
/* global $Keys */
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './IconButton.css';
import Icon from 'gestalt-icon';
import icons from '../gestalt-icon/icons/index.js';

const cx = classnames.bind(styles);

type Props = {
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons provided in gestalt-icon/icons/index.js.
   */
  icon: $Keys<typeof icons>,
  label: string,
  onClick?: () => void,
  size?: number,
}

export default function IconButton(props: Props) {
  const {
    icon,
    label,
    onClick,
  } = props;

  const classes = cx(
    'iconButton',
  );

  const inlineStyle = {
    height: 50,
    width: 50,
  };

  return (
    <button
      aria-label={label}
      className={classes}
      onClick={onClick}
      style={inlineStyle}
    >
      {/*
        We're explicitly setting an empty string as a label on the Icon since we
        already have an aria-label on the button container.
        This is similar to having empty `alt` attributes:
        https://davidwalsh.name/accessibility-tip-empty-alt-attributes
      */}
      <Icon icon={icon} size={25} label="" />
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.number,
};
