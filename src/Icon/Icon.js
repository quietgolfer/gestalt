// @flow
/* global $Keys */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Icon.css';
import icons from './icons';
import colors from '../Colors.css';

type Color = 'blue' | 'darkGray' | 'gray' | 'red' | 'white';

type IconProps = {
  accessibilityLabel: string,
  color?: Color,
  dangerouslySetSvgPath?: { __path: string },

  /* $Keys is an undocumented feature of Flow that helps with creating enums dynamically.
   * This allows us to type check for a valid icon name based on the keys from the list of
   * icons provided in gestalt-icon/icons/index.js.
   */
  icon?: $Keys<typeof icons>,
  inline?: boolean,
  size?: number
};

export default function Icon(props: IconProps) {
  const {
    accessibilityLabel,
    color = 'gray',
    icon,
    inline,
    size = 16,
    dangerouslySetSvgPath
  } = props;

  const cs = classnames(styles.icon, colors[color], !inline && 'block');

  // eslint-disable-next-line no-underscore-dangle
  const path = icon ? icons[icon] : dangerouslySetSvgPath.__path;

  return (
    <svg
      className={cs}
      height={size}
      width={size}
      viewBox="0 0 16 16"
      aria-label={accessibilityLabel}
      role="img"
    >
      <title>{accessibilityLabel}</title>
      <path d={path} />
    </svg>
  );
}

Icon.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['white', 'gray', 'darkGray', 'blue', 'red']),
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  inline: PropTypes.bool,
  size: PropTypes.number,
  dangerouslySetSvgPath: PropTypes.shape({
    __path: PropTypes.string
  })
};
