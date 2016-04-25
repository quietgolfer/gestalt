import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/bind';
import styles from './Switch.css';

const cx = classnames.bind(styles);

export default class Switch extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        switched: PropTypes.bool.isRequired,
    }

    static defaultProps = {
        onChange: () => {},
        switched: false,
    }

    render() {
        const {
            onChange,
            switched,
        } = this.props;
        return (
            <div className={cx('Switch', {
                'Switch__switched': switched
            })}
                onClick={onChange}>
                <div className={cx('Switch--slider', {'Switch--slider__switched': switched})} />
                <input
                    checked={switched}
                    className={cx('Switch--checkbox')}
                    readOnly
                    type="checkbox"
                />
            </div>
        );
    }
}
