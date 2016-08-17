import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Switch.css';

const cx = classnames.bind(styles);

export default function Switch(props) {
  const { id, onChange, switched } = props;

  return (
    <div
      className={cx('Switch', {
        Switch__off: !switched,
        Switch__switched: switched,
      })}
    >
      <div
        className={cx('Switch--slider', {
          'Switch--slider__off': !switched,
          'Switch--slider__switched': switched,
        })}
      />
      <input
        checked={switched}
        className={cx('Switch--checkbox')}
        id={id}
        onChange={onChange}
        type="checkbox"
      />
    </div>
  );
}

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  switched: PropTypes.bool.isRequired,
};

Switch.defaultProps = {
  onChange: () => {},
  switched: false,
};
