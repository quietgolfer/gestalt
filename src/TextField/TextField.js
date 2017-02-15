// @flow

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ErrorFlyout from '../ErrorFlyout/ErrorFlyout';
import styles from './TextField.css';

type State = {
  focused: boolean,
  errorIsOpen: boolean,
};

export default class TextField extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
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

  state:State = {
    focused: false,
    errorIsOpen: false,
  };

  props: {
    errorMessage?: string,
    hasError?: bool,
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

  handleBlur = () => {
    this.setState({ errorIsOpen: true });
  }

  render() {
    const {
      errorMessage,
      hasError,
      id,
      placeholder,
      type,
      value,
    } = this.props;

    const classes = classnames(styles.textField, {
      [styles.normal]: !hasError || !errorMessage,
      [styles.errored]: hasError || errorMessage,
    });

    const textField = onBlur => (
      <input
        aria-describedby={`${id}-gestalt-error`}
        aria-invalid={(errorMessage || hasError) ? 'true' : 'false'}
        className={classes}
        id={id}
        onBlur={onBlur}
        onChange={this.handleChange}
        onFocus={onBlur}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    );

    return errorMessage ? (
      <ErrorFlyout
        id={`${id}-gestalt-error`}
        idealDirection="right"
        isOpen={this.state.errorIsOpen}
        message={errorMessage}
        onDismiss={() => this.setState({ errorIsOpen: false })}
        size="sm"
        trigger={textField(this.handleBlur)}
      />
    ) : textField();
  }
}
