// @flow

import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './TextArea.css';

const cx = classnames.bind(styles);

function handleChange(e: Event, onChange) {
  if (e.target instanceof HTMLInputElement) {
    onChange(e.target.value);
  }
}

type Props = {
  hasError?: boolean,
  id: string,
  name?: string,
  onChange: (value: string) => void,
  placeholder?: string,
  value?: string,
};

export default function TextArea(props: Props) {
  const {
    hasError = false,
    id,
    name,
    onChange,
    placeholder,
    value,
  } = props;

  const classes = cx({
    textarea: !hasError,
    errored: hasError,
  });

  return (
    <div>
      <textarea
        className={classes}
        id={id}
        name={name}
        onChange={(e: Event) => { handleChange(e, onChange); }}
        placeholder={placeholder}
        rows={3}
        value={value}
      />
    </div>
  );
}

TextArea.propTypes = {
  hasError: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
