// @flow

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './TextArea.css';

export default class TextArea extends Component {
  propTypes = {
    hasError: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  defaultProps = {
    hasError: false,
  };

  props: {
    hasError?: boolean,
    id: string,
    name?: string,
    onChange: (value: string) => void,
    placeholder?: string,
    value?: string,
  };

  handleChange = (e: Event) => {
    if (e.target instanceof HTMLTextAreaElement) {
      this.props.onChange(e.target.value);
    }
  }

  render() {
    const {
      hasError,
      id,
      name,
      placeholder,
      value,
    } = this.props;

    const classes = classnames(styles.textArea, {
      [styles.normal]: !hasError,
      [styles.errored]: hasError,
    });

    return (
      <div>
        <textarea
          className={classes}
          id={id}
          name={name}
          onChange={this.handleChange}
          placeholder={placeholder}
          rows={3}
          value={value}
        />
      </div>
    );
  }
}
