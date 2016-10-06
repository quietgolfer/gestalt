// @flow

import React, { Element, PropTypes } from 'react';
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
  children?: Element<any>,
  color?: 'gray' | 'dark-gray',
  inline?: bool,
  italic?: bool,
  overflow?: 'break-word' | 'normal',
  size?: 'xs' | 's' | 'm' | 'l' | 'xl',
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

Text.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['gray', 'dark-gray']),
  inline: PropTypes.bool,
  italic: PropTypes.bool,
  overflow: PropTypes.oneOf(['break-word', 'normal']),
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  truncate: PropTypes.bool,
};
