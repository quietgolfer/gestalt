import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Text.css';

const cx = classnames.bind(styles);

export default function Text(props) {
    const { children, size } = props;
    const cs = cx('Text', `Text--${size}`);
    return <div className={cs}>{children}</div>;
};

Text.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
};
