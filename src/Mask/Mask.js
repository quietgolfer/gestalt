// @flow
import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './Mask.css';

type Props = {
  children?: any,
  height?: number,
  shape?: 'circle' | 'rounded' | 'square',
  width?: number,
  wash?: bool,
};

export default function Mask(props: Props) {
  const { children, shape = 'square', width, height, wash = false } = props;
  return (
    <div
      className={cx(styles.Mask, styles[shape])}
      style={{ width, height }}
    >
      {children}
      {wash ? <div className={styles.wash} /> : null}
    </div>
  );
}

Mask.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  shape: PropTypes.oneOf(['circle', 'rounded', 'square']),
  width: PropTypes.number,
  wash: PropTypes.bool,
};
