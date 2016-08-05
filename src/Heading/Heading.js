import { createElement, Element } from 'react';
import classnames from 'classnames/bind';
import styles from '../../styles.css';

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
  color?: 'white' | 'light-gray' | 'dark-gray' | 'blue',
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
        'my0',
        'sans-serif',
        `display-${size}`,
        color
    );
  return createElement(sizesToElementMap[size], { className: cs }, children);
}
