import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Mask.css';

const cx = classnames.bind(styles);

export default function Mask(props) {
    const { children, type, width, height } = props;

    const cs = cx('Mask', {
        'Mask--square': type === 'square',
        'Mask--rounded': type === 'rounded',
        'Mask--circle': type === 'circle'
    });

    return <div className={cs} style={{width, height}}>{children}</div>;
}

Mask.propTypes = {
    children: PropTypes.node,
    height: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['square', 'rounded', 'circle']),
    width: PropTypes.number.isRequired
};

Mask.defaultProps = {
    type: 'square'
};
