// @flow

import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import colorStyles from '../Colors.css';
import typographyStyles from '../Typography.css';
import layoutStyles from '../Layout.css';

const styles = {
  ...colorStyles,
  ...typographyStyles,
  ...layoutStyles,
};

const cx = classnames.bind(styles);

type Props = {
  align?: 'left' | 'right' | 'center' | 'justify',
  bold?: bool,
  children?: any,
  color?: 'blue' | 'dark-gray' | 'gray' | 'red' | 'white',
  inline?: bool,
  italic?: bool,
  overflow?: 'break-word' | 'normal',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  truncate?: bool,
};

export default function Text(props: Props) {
  const {
    align = 'left',
    bold = false,
    children,
    color = 'dark-gray',
    inline = false,
    italic = false,
    size = 'md',
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

Text.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['blue', 'dark-gray', 'gray', 'red', 'white']),
  inline: PropTypes.bool,
  italic: PropTypes.bool,
  overflow: PropTypes.oneOf(['break-word', 'normal']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  truncate: PropTypes.bool,
};
