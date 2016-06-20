import classnames from 'classnames/bind';
import React, { PropTypes } from 'react';
import styles from './Tabs.css';
import Text from '../Text/Text';

const cx = classnames.bind(styles);

export default function Tabs(props) {
  const {
    items,
    onChange,
    selectedItemIndex,
  } = props;
  return (
    <div className={cx('Tabs')} role="tablist">
      {items.map((item, i) => {
        const isSelected = i === selectedItemIndex;
        const cs = cx('Tabs--item', {
          'Tabs--item__isNotSelected': !isSelected,
          'Tabs--item__isSelected': isSelected,
        });
        return (
          <button className={cs} key={i} onClick={(e) => onChange && onChange(i, e)} role="tab">
            <Text bold color={isSelected ? 'black' : 'gray'} size="xs">{item}</Text>
          </button>
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
