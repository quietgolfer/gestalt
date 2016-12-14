// @flow
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Switch.css';

const cx = classnames.bind(styles);

type Props = {
  id: string,
  onChange: (value: boolean) => void,
  switched?: boolean,
}

export default function Switch(props: Props) {
  const { id, onChange, switched = false } = props;

  const switchStyles = cx(
    {
      switchedOn: switched,
      switchedOff: !switched,
    }
  );

  const sliderStyles = cx(
    {
      sliderOn: switched,
      sliderOff: !switched,
    }
  );

  return (
    <div className={switchStyles} >
      <input
        checked={switched}
        className={cx('checkbox')}
        id={id}
        onChange={
          (e: { nativeEvent: { target: { checked: boolean}}}) => {
            const checked = e.nativeEvent.target.checked;
            return onChange(checked);
          }
        }
        type="checkbox"
      />
      <div className={sliderStyles} />
    </div>
  );
}

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  switched: PropTypes.bool,
};
