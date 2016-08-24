import React from 'react';
import classnames from 'classnames/bind';
import styles from '../../styles.css';
import iconStyles from './Icon.css';
import paths from './icons/index.js';

const combinedStyles = Object.assign(styles, iconStyles);

const cx = classnames.bind(combinedStyles);

type IconProps = {
  color?: 'white' | 'light-gray' | 'dark-gray' | 'blue',
  icon: string,
  label: string,
  size?: number
};

export default function Icon(props: IconProps) {
  const {
    color = 'light-gray',
    icon,
    label,
    size = 16,
  } = props;

  const cs = cx(
      'Icon',
      `Icon--${icon}`,
      color
  );

  const path = paths[icon];

  return (
    <svg className={cs} height={size} width={size} viewBox="0 0 16 16">
      <title>{label}</title>
      <path d={path} />
    </svg>
  );
}
