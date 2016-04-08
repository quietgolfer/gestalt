import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Tabs.css';

const cx = classnames.bind(styles);

export default function Tabs(props) {
    const {
        items,
        onChange,
        selectedItemIndex
    } = props;
    return (
        <div className={cx('Tabs')}>
            {items.map((item, i) => {
                const cs = cx('Tabs--item', {
                    'Tabs--item__isSelected': i === selectedItemIndex
                });
                return (
                    <div className={cs} key={i} onClick={(e) => onChange && onChange(i, e)}>
                        {item}
                    </div>
                );
            })}
        </div>
    );
}

Tabs.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func,
    selectedItemIndex: PropTypes.number.isRequired,
};
