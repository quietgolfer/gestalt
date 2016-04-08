import { createElement, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Heading.css';

const cx = classnames.bind(styles);

const sizeElementMap = {
    xs: 'h5',
    s:  'h4',
    m: 'h3',
    l: 'h2',
    xl: 'h1'
};

export default function Heading(props) {
    const { children, color, size } = props;
    const cs = cx('Heading', `Heading--${size}`, `Heading--${color}`);
    return createElement(sizeElementMap[size], {className: cs}, children);
};

Heading.propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['white', 'lightgray', 'darkgray', 'blue', 'green']).isRequired,
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
};

Heading.defaultProps = {
    color: 'darkgray'
};
