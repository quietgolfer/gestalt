/* TODO(juliac): Add the following items.
 * Tests
 */

// @flow
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Button.css';

const cx = classnames.bind(styles);

type Props = {
  color?: 'gray' | 'red' | 'blue',
  disabled?: boolean,
  fullWidth?: boolean,
  onClick?: () => void,
  text: string,
  type?: 'submit' | 'button',
}

export default function Button(props: Props) {
  const {
    color = 'gray',
    disabled = false,
    fullWidth = false,
    onClick,
    text,
    type = 'button',
  } = props;

  const classes = cx(
    {
      disabled,
      [color]: !disabled,
    },
    type,
    {
      fullWidth,
      variable: !fullWidth,
    },
  );

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['blue', 'gray', 'red']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
};
