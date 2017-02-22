// @flow
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Switch.css';

const cx = classnames.bind(styles);

type Props = {
  id: string,
  name?: string,
  onChange: (value: boolean) => void,
  switched?: boolean,
}

export default function Switch(props: Props) {
  const { id, name, onChange, switched = false } = props;

  const switchStyles = classnames(styles.switch, {
    [styles.switchOn]: switched,
    [styles.switchOff]: !switched,
  });

  const sliderStyles = cx(styles.slider, {
    [styles.sliderOn]: switched,
    [styles.sliderOff]: !switched,
  });

  return (
    <div className={switchStyles} >
      <input
        checked={switched}
        className={styles.checkbox}
        name={name}
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
