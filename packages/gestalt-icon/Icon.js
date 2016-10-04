// @flow
import React from 'react';
import classnames from 'classnames/bind';
import colorStyles from 'gestalt-colors/Colors.css';
import iconStyles from './Icon.css';
import paths from './icons/index.js';
import accessibilityToken from 'gestalt-accessibility-token';

const combinedStyles = {
  ...colorStyles,
  ...iconStyles,
};

const cx = classnames.bind(combinedStyles);

type IconWithIdProps = {
  color?: 'white' | 'gray' | 'dark-gray' | 'blue',
  icon: string,
  label: string,
  size?: number
};

type IconProps = IconWithIdProps & {
  id?: string
};

export function Icon(props: IconProps) {
  const {
    color = 'gray',
    icon,
    id,
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
    <svg className={cs} height={size} width={size} viewBox="0 0 16 16" aria-labelledby={id}>
      <title id={id}>{label}</title>
      <path d={path} />
    </svg>
  );
}

export default function IconWithId(props: IconWithIdProps) {
  const id = accessibilityToken('icon_');

  return (
    <Icon id={id} {...props} />
  );
}
