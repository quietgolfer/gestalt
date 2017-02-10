// @flow

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Error from '../Error/Error';
import styles from './TextField.css';

type State = {
  focused: boolean,
  errorIsOpen: boolean,
};

export default class TextField extends Component {

  static propTypes = {
    errorMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['email', 'password', 'text', 'url']),
    value: PropTypes.string,
  };

  defaultProps = {
    type: 'text',
  };

  state:State = {
    focused: false,
    errorIsOpen: false,
  };

  props: {
    errorMessage?: string,
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
      id,
      placeholder,
      type,
      value,
    } = this.props;

    const classes = classnames(styles.textField, {
      [styles.normal]: !errorMessage,
      [styles.errored]: errorMessage,
    });

    const textField = onBlur => (
      <input
        aria-invalid={errorMessage ? 'true' : 'false'}
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
      <Error
        idealDirection="right"
        isOpen={this.state.errorIsOpen}
        onDismiss={() => this.setState({ errorIsOpen: false })}
        size="sm"
        text={errorMessage}
        trigger={textField(this.handleBlur)}
      />
    ) : textField();
  }
}
