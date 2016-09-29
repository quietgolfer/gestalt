import React, { Element } from 'react';
import classnames from 'classnames/bind';
import typographyStyles from 'gestalt-typography/Typography.css';
import layoutStyles from 'gestalt-layout/Layout.css';

const styles = {
  ...typographyStyles,
  ...layoutStyles,
};

const cx = classnames.bind(styles);

type TextProps = {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: bool,
  children: Element,
  color?: 'gray' | 'dark-gray',
  inline?: bool,
  italic?: bool,
  locale?: string,
  overflow?: 'break-word' | 'normal',
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
  truncate?: bool,
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
    overflow = 'normal',
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
      overflow: overflow !== 'normal',
      truncate,
    }
  );
  const Tag = inline ? 'span' : 'div';
  return <Tag className={cs}>{children}</Tag>;
}
