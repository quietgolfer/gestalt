import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from '../../styles.css';

const cx = classnames.bind(styles);

export default function Switch(props) {
  const { id, onChange, switched } = props;

  const switchComposed = cx('border-box', 'inline-block', 'relative', 'pointer',
    {
      'bg-light-gray': !switched,
      'bg-dark-green': switched,
    });

  const switchInline = {
    borderRadius: 48,
    height: 28,
    padding: 2,
    transition: 'background 0.2s ease',
    width: 48,
  };

  const sliderComposed = cx('absolute', 'bg-white', 'circle');

  const sliderInline = {
    height: 24,
    left: switched ? 22 : 2,
    transition: 'left 0.2s ease',
    width: 24,
  };

  const checkboxComposed = cx('absolute', 'm0', 'no-border', 'p0', 'pointer');

  const checkboxInline = {
    height: '100%',
    opacity: 0,
    width: '100%',
    zIndex: 2,
  };

  return (
    <div className={switchComposed} style={switchInline} >
      <input
        checked={switched}
        className={checkboxComposed}
        id={id}
        onChange={(e) => onChange(e.nativeEvent.target.checked)}
        style={checkboxInline}
        type="checkbox"
      />
      <div className={sliderComposed} style={sliderInline} />
    </div>
  );
}

Switch.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  switched: PropTypes.bool,
};

Switch.defaultProps = {
  onChange: () => {},
  switched: false,
};
