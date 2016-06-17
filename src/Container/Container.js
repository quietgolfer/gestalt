import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from '../../src/index.css';
const cx = classnames.bind(styles);

export default function Container({ children }) {
  return (
    <div className={cx('mx-auto')} style={{ maxWidth: '40rem' }}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};
