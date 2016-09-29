import React from 'react';
import styles from './Divider.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export default function Divider() {
  return <hr className={cx('divider')} />;
}
