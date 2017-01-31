/* TODO(juliac): Add the following items.
 * Tests
 */

// @flow
/* eslint-disable react/no-unused-prop-types */
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Button.css';

const cx = classnames.bind(styles);

type Props = {
  aria?: {
    expanded?: boolean,
    haspopup?: boolean,
  },
  color?: 'gray' | 'red' | 'blue',
  disabled?: boolean,
  fullWidth?: boolean,
  onClick?: () => void,
  text: string,
  type?: 'submit' | 'button',
}

export default function Button(props: Props) {
  const {
    aria = {},
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
      enabled: !disabled,
    },
    type,
    {
      fullWidth,
      variable: !fullWidth,
    },
  );

  return (
    <button
      aria-expanded={aria.expanded}
      aria-haspopup={aria.haspopup}
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
  aria: PropTypes.shape({
    expanded: PropTypes.bool,
    haspopup: PropTypes.bool,
  }),
  color: PropTypes.oneOf(['blue', 'gray', 'red']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
};
