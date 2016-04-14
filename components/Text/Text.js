import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Text.css';

const cx = classnames.bind(styles);

export default function Text(props) {
    const { bold, children, color, size } = props;
    const cs = cx('Text', `Text--${size}`, `Text--${color}`, {
        'Text--bold': bold
    });
    return <div className={cs}>{children}</div>;
};

Text.propTypes = {
    bold: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['black', 'gray']),
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired
};

Text.defaultProps = {
    bold: false,
    color: 'black'
};
