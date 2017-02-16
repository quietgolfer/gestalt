// @flow

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ErrorFlyout from '../ErrorFlyout/ErrorFlyout';
import styles from './TextArea.css';

type State = {
  focused: boolean,
  errorIsOpen: boolean,
};

export default class TextArea extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  state:State = {
    focused: false,
    errorIsOpen: false,
  };

  props: {
    errorMessage?: string,
    id: string,
    name?: string,
    onBlur?: (value: string) => void,
    onChange: (value: string) => void,
    onFocus?: (value: string) => void,
    placeholder?: string,
    value?: string,
  };

  handleChange = (e: Event) => {
    if (e.target instanceof HTMLTextAreaElement) {
      this.props.onChange(e.target.value);
    }
  }

  handleBlur = (e: Event) => {
    this.setState({ errorIsOpen: false });
    if (e.target instanceof HTMLTextAreaElement && this.props.onBlur) {
      this.props.onBlur(e.target.value);
    }
  }

  handleFocus = (e: Event) => {
    this.setState({ errorIsOpen: true });
    if (e.target instanceof HTMLTextAreaElement && this.props.onFocus) {
      this.props.onFocus(e.target.value);
    }
  }

  render() {
    const {
      errorMessage,
      id,
      name,
      placeholder,
      value,
    } = this.props;

    const classes = classnames(styles.textArea, {
      [styles.normal]: !errorMessage,
      [styles.errored]: errorMessage,
    });

    const textArea = (onBlur, onFocus) => (
      <textarea
        aria-describedby={`${id}-gestalt-error`}
        aria-invalid={errorMessage ? 'true' : 'false'}
        className={classes}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={this.handleChange}
        onFocus={onFocus}
        placeholder={placeholder}
        rows={3}
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
        trigger={textArea(this.handleBlur, this.handleFocus)}
      />
    ) : textArea();
  }
}
