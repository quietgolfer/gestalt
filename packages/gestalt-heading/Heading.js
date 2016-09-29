import { createElement, Element } from 'react';
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
  children: Element,
  color?: 'white' | 'gray' | 'dark-gray' | 'blue',
  size: 'xs' | 's' | 'm' | 'l' | 'xl'
};

export default function Heading(props: HeadingProps) {
  const {
    children,
    color = 'dark-gray',
    size,
  } = props;

  const cs = cx(
    'antialiased',
    'bold',
    'mb0',
    'mt0',
    'sans-serif',
    `display-${size}`,
    color,
  );
  return createElement(sizesToElementMap[size], { className: cs }, children);
}
