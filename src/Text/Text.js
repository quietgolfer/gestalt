import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';

import styles from '../index.css';

const cx = classnames.bind(styles);

export default function Text(props) {
    const { bold, color, children, size, truncate } = props;
    const cs = cx('sans-serif', `text-${size}`, 'antialiased', color, {
        bold,
        truncate,
    });
    return <div className={cs}>{children}</div>;
};

Text.propTypes = {
    bold: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['dark-gray', 'light-gray']),
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
    truncate: PropTypes.bool.isRequired,
};

Text.defaultProps = {
    bold: false,
    color: 'dark-gray',
    truncate: false
};
