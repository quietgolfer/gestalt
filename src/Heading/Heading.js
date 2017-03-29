// @flow
import { createElement, PropTypes } from 'react';
import cx from 'classnames';
import colors from '../Colors.css';

const defaultHeadingLevels = {
  xs: 5,
  sm: 4,
  md: 3,
  lg: 2,
  xl: 1,
};

type Color = 'blue' | 'darkGray' | 'gray' | 'red' | 'white';

type Props = {|
  accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6,
  children?: any,
  color?: Color,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  truncate?: bool,
|};

export default function Heading(props: Props) {
  const {
    accessibilityLevel,
    children,
    color = 'darkGray',
    size,
    truncate = false,
  } = props;

  const cs = cx(
    'antialiased',
    'bold',
    'mb0',
    'mt0',
    'sans-serif',
    `display-${size}`,
    colors[color],
    'break-word',
    truncate,
  );

  const headingLevel = accessibilityLevel || defaultHeadingLevels[size];
  return createElement(`h${headingLevel}`, { className: cs }, children);
}

Heading.propTypes = {
  accessibilityLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node,
  color: PropTypes.oneOf(['blue', 'darkGray', 'gray', 'red', 'white']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
  truncate: PropTypes.bool,
};
