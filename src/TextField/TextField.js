// @flow

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './TextField.css';

export default class TextField extends Component {
  propTypes = {
    hasError: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['email', 'password', 'text', 'url']),
    value: PropTypes.string,
  };

  defaultProps = {
    hasError: false,
    type: 'text',
  };

  props: {
    hasError?: boolean,
    id: string,
    onChange: (value: string) => void,
    placeholder?: string,
    type?: 'email' | 'password' | 'text' | 'url',
    value?: string,
  };

  handleChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    const {
      hasError,
      id,
      placeholder,
      type,
      value,
    } = this.props;

    const classes = classnames(styles.textField, {
      [styles.normal]: !hasError,
      [styles.errored]: hasError,
    });

    return (
      <input
        className={classes}
        id={id}
        onChange={this.handleChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    );
  }
}
