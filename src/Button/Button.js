import React, { PropTypes } from 'react';
import Text from '../Text/Text';
import classnames from 'classnames/bind';
import styles from './Button.css';

const cx = classnames.bind(styles);

export default function Button(props) {
  const { disabled, onClick, text } = props;
  let { type } = props;

  if (disabled) {
    type = 'disabled';
  }
  const cs = cx('Button', `Button--${type}`);
  return (
    <button className={cs} onClick={onClick}>
      <Text size="m">
        {text}
      </Text>
    </button>
  );
}

Button.propTypes = {
  block: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'red', 'blue']).isRequired,
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  type: 'default',
  block: false,
};
