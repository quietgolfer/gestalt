import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Navbar.css';

const cx = classnames.bind(styles);

export default function Navbar(props) {
  const {
    children,
  } = props;
  return (
    <div className={cx('Navbar')}>
      {children}
    </div>
  );
}

Navbar.propTypes = {
  children: PropTypes.node,
};
