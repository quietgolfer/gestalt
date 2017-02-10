// @flow
/* global $Keys */
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Icon.css';
import paths from './icons';

const cx = classnames.bind(styles);

type IconProps = {
  color?: 'white' | 'gray' | 'dark-gray' | 'blue' | 'red',
  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons provided in gestalt-icon/icons/index.js.
   */
  icon: $Keys<typeof paths>,
  inline?: boolean,
  label: string,
  size?: number,
};

export default function Icon(props: IconProps) {
  const {
    color = 'gray',
    icon,
    inline,
    label,
    size = 16,
  } = props;

  const cs = cx(
    'Icon',
    `Icon--${icon}`,
    color,
    (!inline && 'block'),
  );

  const path = paths[icon];

  return (
    <svg className={cs} height={size} width={size} viewBox="0 0 16 16" aria-label={label} role="img">
      <title>{label}</title>
      <path d={path} />
    </svg>
  );
}

Icon.propTypes = {
  color: PropTypes.oneOf(['white', 'gray', 'dark-gray', 'blue', 'red']),
  icon: PropTypes.oneOf(Object.keys(paths)).isRequired,
  inline: PropTypes.bool,
  label: PropTypes.string.isRequired,
  size: PropTypes.number,
};
