// @flow
/* eslint-disable react/no-unused-prop-types */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Button.css';

type Props = {
  ariaExpanded?: boolean,
  ariaHaspopup?: boolean,
  color?: 'gray' | 'red' | 'blue',
  disabled?: boolean,
  inline?: boolean,
  onClick?: () => void,
  text: string,
  type?: 'submit' | 'button',
}

export default function Button(props: Props) {
  const {
    ariaExpanded,
    ariaHaspopup,
    color = 'gray',
    disabled = false,
    inline = false,
    onClick,
    text,
    type = 'button',
  } = props;

  const classes = classnames(styles.button, {
    [styles.disabled]: disabled,
    [styles.enabled]: !disabled,
    [styles[color]]: !disabled,
    [styles.inline]: inline,
    [styles.block]: !inline,
  });

  return (
    <button
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHaspopup}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  ariaExpanded: PropTypes.bool,
  ariaHaspopup: PropTypes.bool,
  color: PropTypes.oneOf(['blue', 'gray', 'red']),
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
};
