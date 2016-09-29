// @flow

import React, { Element, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Mask.css';

const cx = classnames.bind(styles);

type Props = {
  children?: Element<any>,
  height?: number,
  shape?: 'circle' | 'rounded' | 'square',
  width?: number,
};

export default function Mask(props: Props) {
  const { children, shape = 'square', width, height } = props;

  return <div className={cx(shape)} style={{ width, height }}>{children}</div>;
}

Mask.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  shape: PropTypes.oneOf(['circle', 'rounded', 'square']),
  width: PropTypes.number,
};
