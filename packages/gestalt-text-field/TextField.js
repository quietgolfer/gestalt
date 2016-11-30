// @flow

import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './TextField.css';

const cx = classnames.bind(styles);

function handleChange(e: Event, onChange) {
  if (e.target instanceof HTMLInputElement) {
    onChange(e.target.value);
  }
}

type Props = {
  hasError?: boolean,
  id: string,
  onChange: (value: string) => void,
  placeholder?: string,
  type?: 'email' | 'password' | 'text' | 'url',
  value?: string,
};

export default function TextField(props: Props) {
  const {
    hasError = false,
    id,
    onChange,
    placeholder,
    type = 'text',
    value,
  } = props;

  const classes = cx({
    textfield: !hasError,
    errored: hasError,
  });

  return (
    <div>
      <input
        className={classes}
        id={id}
        onChange={(e: Event) => { handleChange(e, onChange); }}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
}

TextField.propTypes = {
  hasError: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['email', 'password', 'text', 'url']),
  value: PropTypes.string,
};
