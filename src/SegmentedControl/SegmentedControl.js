// @flow
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import Text from '../Text/Text';
import styles from './SegmentedControl.css';

type Props = {|
  items: Array<any>,
  onChange: (i: number, e: Event) => void,
  selectedItemIndex: number
|};

export default function SegmentedControl(props: Props) {
  const {
    items,
    onChange,
    selectedItemIndex,
  } = props;
  return (
    <div className={styles.SegmentedControl} role="tablist">
      {items.map((item, i) => {
        const isSelected = i === selectedItemIndex;
        const cs = classnames(styles.item, {
          [styles.itemIsNotSelected]: !isSelected,
          [styles.itemIsSelected]: isSelected,
        });
        return (
          <button
            aria-selected={isSelected}
            className={cs}
            key={i}
            onClick={e => onChange(i, e)}
            role="tab"
          >
            <Text
              bold
              color={isSelected ? 'darkGray' : 'gray'}
              align="center"
              truncate
              size="lg"
            >
              {item}
            </Text>
          </button>
        );
      })}
    </div>
  );
}

SegmentedControl.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
};
