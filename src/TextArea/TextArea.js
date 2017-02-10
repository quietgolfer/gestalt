// @flow

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Error from '../Error/Error';
import styles from './TextArea.css';

type State = {
  focused: boolean,
  errorIsOpen: boolean,
};

export default class TextArea extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
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
    onChange: (value: string) => void,
    placeholder?: string,
    value?: string,
  };

  handleChange = (e: Event) => {
    if (e.target instanceof HTMLTextAreaElement) {
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
      name,
      placeholder,
      value,
    } = this.props;

    const classes = classnames(styles.textArea, {
      [styles.normal]: !errorMessage,
      [styles.errored]: errorMessage,
    });

    const textArea = onBlur => (
      <textarea
        aria-invalid={errorMessage ? 'true' : 'false'}
        className={classes}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={this.handleChange}
        onFocus={onBlur}
        placeholder={placeholder}
        rows={3}
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
        trigger={textArea(this.handleBlur)}
      />
    ) : textArea();
  }
}
