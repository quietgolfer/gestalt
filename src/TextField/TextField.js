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
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['email', 'password', 'text', 'url']),
    value: PropTypes.string,
  };

  static defaultProps = {
    hasError: false,
    type: 'text',
  };

  state:State = {
    focused: false,
    errorIsOpen: false,
  };

  props: {|
    errorMessage?: string,
    hasError?: bool,
    id: string,
    onBlur?: (value: string) => void,
    onChange: (value: string) => void,
    onFocus?: (value: string) => void,
    placeholder?: string,
    type?: 'email' | 'password' | 'text' | 'url',
    value?: string,
  |};

  handleChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.props.onChange(e.target.value);
    }
  }

  handleBlur = (e: Event) => {
    this.setState({ errorIsOpen: false });
    if (e.target instanceof HTMLInputElement && this.props.onBlur) {
      this.props.onBlur(e.target.value);
    }
  }

  handleFocus = (e: Event) => {
    this.setState({ errorIsOpen: true });
    if (e.target instanceof HTMLInputElement && this.props.onFocus) {
      this.props.onFocus(e.target.value);
    }
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
      [styles.normal]: !errorMessage,
      [styles.errored]: hasError || errorMessage,
    });

    const textField = (onBlur, onFocus) => (
      <input
        aria-describedby={errorMessage && this.state.focused ? `${id}-gestalt-error` : null}
        aria-invalid={(errorMessage || hasError) ? 'true' : 'false'}
        className={classes}
        id={id}
        onBlur={onBlur}
        onChange={this.handleChange}
        onFocus={onFocus}
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
        trigger={textField(this.handleBlur, this.handleFocus)}
      />
    ) : textField();
  }
}
