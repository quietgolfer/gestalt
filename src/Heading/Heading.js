// @flow
import { createElement, PropTypes } from 'react';
import cx from 'classnames';

const defaultHeadingLevels = {
  xs: 5,
  sm: 4,
  md: 3,
  lg: 2,
  xl: 1,
};

type Props = {
  accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6,
  children?: any,
  color?: 'blue' | 'dark-gray' | 'gray' | 'red' | 'white',
  overflow?: 'normal' | 'breakWord',
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  truncate?: bool,
};

export default function Heading(props: Props) {
  const {
    accessibilityLevel,
    children,
    color = 'dark-gray',
    size,
    overflow = 'normal',
    truncate = false,
  } = props;

  const cs = cx(
    'antialiased',
    'bold',
    'mb0',
    'mt0',
    'sans-serif',
    `display-${size}`,
    color,
    {
      'break-word': overflow === 'breakWord',
      truncate,
    },
  );

  const headingLevel = accessibilityLevel || defaultHeadingLevels[size];
  return createElement(`h${headingLevel}`, { className: cs }, children);
}

Heading.propTypes = {
  accessibilityLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node,
  color: PropTypes.oneOf(['blue', 'dark-gray', 'gray', 'red', 'white']),
  overflow: PropTypes.oneOf(['normal', 'breakWord']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
  truncate: PropTypes.bool,
};
