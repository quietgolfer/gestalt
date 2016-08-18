import React, { Element } from 'react';
import classnames from 'classnames/bind';

import styles from '../../styles.css';

const cx = classnames.bind(styles);

type TextProps = {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: bool,
  children: Element,
  color?: 'light-gray' | 'dark-gray',
  inline?: bool,
  italic?: bool,
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
  truncate?: bool
};

export default function Text(props: TextProps) {
  const {
    align = 'left',
    bold = false,
    children,
    color = 'dark-gray',
    inline = false,
    italic = false,
    size = 'm',
    truncate = false,
  } = props;

  const cs = cx(
    'antialiased',
    'sans-serif',
    `text-${size}`,
    color,
    `text-${align}`,
    {
      bold,
      italic,
      truncate,
    }
  );
  const Tag = inline ? 'span' : 'div';
  return <Tag className={cs}>{children}</Tag>;
}
