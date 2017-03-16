// @flow
/* global $Keys */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Icon.css';
import icons from './icons';

type Color = 'blue' | 'darkGray' | 'gray' | 'red' | 'white';
const iconColor = (color: Color) => {
  switch (color) {
    case 'darkGray':
      return 'dark-gray';
    default:
      return color;
  }
};

type IconProps = {
  color?: Color,
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons provided in gestalt-icon/icons/index.js.
   */
  ariaLabel: string,
  icon: $Keys<typeof icons>,
  inline?: boolean,
  size?: number,
};

export default function Icon(props: IconProps) {
  const {
    ariaLabel,
    color = 'gray',
    icon,
    inline,
    size = 16,
  } = props;

  const cs = classnames(
    styles.icon,
    iconColor(color),
    (!inline && 'block'),
  );

  const path = icons[icon];

  return (
    <svg className={cs} height={size} width={size} viewBox="0 0 16 16" aria-label={ariaLabel} role="img">
      <title>{ariaLabel}</title>
      <path d={path} />
    </svg>
  );
}

Icon.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['white', 'gray', 'darkGray', 'blue', 'red']),
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  inline: PropTypes.bool,
  size: PropTypes.number,
};
