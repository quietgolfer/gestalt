// @flow
import React from 'react';
import classnames from 'classnames/bind';
import styles from './Divider.css';

const cx = classnames.bind(styles);

export default function Divider() {
  return <hr className={cx('divider')} />;
}
