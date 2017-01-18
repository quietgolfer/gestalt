// @flow
import { createElement, PropTypes } from 'react';
import cx from 'classnames';

const sizesToElementMap = {
  xs: 'h5',
  sm: 'h4',
  md: 'h3',
  lg: 'h2',
  xl: 'h1',
};

type Props = {
  children?: any,
  color?: 'blue' | 'dark-gray' | 'gray' | 'red' | 'white',
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  truncate?: bool,
};

export default function Heading(props: Props) {
  const {
    children,
    color = 'dark-gray',
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
    color,
    {
      truncate,
    },
  );
  return createElement(sizesToElementMap[size], { className: cs }, children);
}

Heading.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['blue', 'dark-gray', 'gray', 'red', 'white']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']).isRequired,
  truncate: PropTypes.bool,
};
