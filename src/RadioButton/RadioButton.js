// @flow
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './RadioButton.css';

export default class RadioButton extends Component {

  static propTypes = {
    checked: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  props: {
    checked?: boolean,
    id: string,
    onChange: (e: { +checked: boolean }) => void,
    value: string,
  };

  handleChange = (e: { nativeEvent: { target: { checked: boolean}}}) => {
    const checked = e.nativeEvent.target.checked;
    this.props.onChange({ checked });
  }

  render() {
    const { checked, id, value } = this.props;

    const customRadioButton = classnames(styles.radioButton, {
      [styles.checked]: checked,
      [styles.unchecked]: !checked
    });

    return (
      <div>
        <input
          checked={checked}
          className={styles.native}
          id={id}
          onChange={this.handleChange}
          type="radio"
          value={value}
        />
        <div className={customRadioButton} />
      </div>
    );
  }
}
