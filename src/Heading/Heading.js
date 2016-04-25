import { createElement, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from '../index.css';

const cx = classnames.bind(styles);

const sizesToElementMap = {
    xs: 'h5',
    s:  'h4',
    m: 'h3',
    l: 'h2',
    xl: 'h1'
};

export default function Heading(props) {
    const { children, color, size } = props;
    const cs = cx('sans-serif', 'antialiased', 'my0', color, `display-${size}`);
    return createElement(sizesToElementMap[size], {className: cs}, children);
};

Heading.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['white', 'light-gray', 'dark-gray', 'blue', 'green']).isRequired,
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
};

Heading.defaultProps = {
    color: 'dark-gray'
};
