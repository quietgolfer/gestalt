// @flow

import { createElement, Element, PropTypes } from 'react';
import classnames from 'classnames/bind';
import colorStyles from 'gestalt-colors/Colors.css';
import typographyStyles from 'gestalt-typography/Typography.css';
import whitespaceStyles from 'gestalt-whitespace/Whitespace.css';

const styles = {
  ...colorStyles,
  ...typographyStyles,
  ...whitespaceStyles,
};

const cx = classnames.bind(styles);

const sizesToElementMap = {
  xs: 'h5',
  s: 'h4',
  m: 'h3',
  l: 'h2',
  xl: 'h1',
};

type HeadingProps = {
  children?: Element<any>,
  color?: 'white' | 'gray' | 'dark-gray' | 'blue',
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
  truncate?: bool,
};

export default function Heading(props: HeadingProps) {
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
  color: PropTypes.oneOf(['white', 'gray', 'dark-gray', 'blue']),
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
  truncate: PropTypes.bool,
};
