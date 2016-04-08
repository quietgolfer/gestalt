import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Card.css';

const cx = classnames.bind(styles);

export default function Card(props, context) {
    const { children } = props;
    return <div className={cx('Card')}>{children}</div>;
};

Card.propTypes = {
    children: PropTypes.node,
};
