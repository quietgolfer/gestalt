// @flow
import React, { Element, PropTypes } from 'react';
import cx from 'classnames';
import styles from './Mask.css';

type Props = {
  children?: Element<any>,
  height?: number,
  shape?: 'circle' | 'rounded' | 'square',
  width?: number,
  wash?: bool,
};

export default function Mask(props: Props = { shape: 'square', wash: false }) {
  const { children, shape, width, height, wash } = props;
  return (
    <div
      className={cx(styles.Mask, styles[shape || 'square'])}
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
  shape: PropTypes.oneOf(['circle', 'rounded', 'square']).isRequired,
  width: PropTypes.number,
  wash: PropTypes.bool.isRequired,
};
