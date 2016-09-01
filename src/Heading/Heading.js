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

type HeadingContext = {
  locale?: string
};

type HeadingProps = {
  children: Element,
  color?: 'white' | 'gray' | 'dark-gray' | 'blue',
  locale?: string,
  size: 'xs' | 's' | 'm' | 'l' | 'xl'
};

export default function Heading(props: HeadingProps, context: HeadingContext) {
  const {
    children,
    color = 'dark-gray',
    size,
  } = props;

  const locale = props.locale || context.locale;

  const cs = cx(
    'antialiased',
    'bold',
    'mb0',
    'mt0',
    'sans-serif',
    `display-${size}`,
    color,
    {
      [`locale-${locale}`]: !!locale,
    }
  );
  return createElement(sizesToElementMap[size], { className: cs }, children);
}
