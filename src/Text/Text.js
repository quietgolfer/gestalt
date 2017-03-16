// @flow

import React, { PropTypes } from 'react';
import cx from 'classnames';

type Color = 'blue' | 'darkGray' | 'gray' | 'red' | 'white';
const textColor = (color: Color) => {
  switch (color) {
    case 'darkGray':
      return 'dark-gray';
    default:
      return color;
  }
};

type Props = {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: bool,
  children?: any,
  color?: Color,
  inline?: bool,
  italic?: bool,
  overflow?: 'normal' | 'breakWord',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  truncate?: bool,
};

export default function Text(props: Props) {
  const {
    align = 'left',
    bold = false,
    children,
    color = 'darkGray',
    inline = false,
    italic = false,
    overflow = 'normal',
    size = 'md',
    truncate = false,
  } = props;


  const cs = cx(
    'antialiased',
    'sans-serif',
    `text-${size}`,
    textColor(color),
    `text-${align}`,
    {
      bold,
      italic,
      'break-word': overflow === 'breakWord',
      truncate,
    }
  );
  const Tag = inline ? 'span' : 'div';
  return <Tag className={cs}>{children}</Tag>;
}

Text.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  bold: PropTypes.bool,
  children: PropTypes.node,
  color: PropTypes.oneOf(['blue', 'darkGray', 'gray', 'red', 'white']),
  inline: PropTypes.bool,
  italic: PropTypes.bool,
  overflow: PropTypes.oneOf(['normal', 'breakWord']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  truncate: PropTypes.bool,
};
