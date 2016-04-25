import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/bind';
import styles from './Navbar.css'

const cx = classnames.bind(styles);

export default class Navbar extends Component {
    static propTypes = {
        children: PropTypes.node,
    }

    render() {
        const {
            children
        } = this.props;
        return (
            <div className={cx('Navbar')}>
                {children}
            </div>
        );
    }
}
