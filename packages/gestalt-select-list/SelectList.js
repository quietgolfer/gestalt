// @flow
/* disable until eslint issue is fixed https://github.com/yannickcr/eslint-plugin-react/issues/819 */
/* eslint-disable react/no-unused-prop-types */

import React, { PropTypes } from 'react';
import styles from './SelectList.css';

type OptionType = {
  key: string,
  value: string,
};

type Props = {
  id: string,
  onChange: (value: string) => void,
  options?: Array<OptionType>,
  selectedKey: string,
};

export default function SelectList(props: Props) {
  const {
    id,
    onChange,
    options = [],
    selectedKey,
  } = props;

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        id={id}
        onBlur={e => onChange(e.target.value)}
        onChange={e => onChange(e.target.value)}
        value={selectedKey}
      >
        {options.map((option, index) => (
          <option className={styles.options} key={index} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
      <div className={styles.dropdownArrow} />
    </div>
  );
}

SelectList.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  selectedKey: PropTypes.string.isRequired,
};
