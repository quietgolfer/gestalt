import classnames from 'classnames/bind';
import React, { PropTypes } from 'react';
import styles from './Tabs.css';
import Text from '../Text/Text';

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
                const isSelected = i === selectedItemIndex;
                const cs = cx('Tabs--item', {
                    'Tabs--item__isSelected': isSelected
                });
                return (
                    <div className={cs} key={i} onClick={(e) => onChange && onChange(i, e)}>
                        <Text bold color={isSelected ? 'black' : 'gray'} size="xs">{item}</Text>
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
