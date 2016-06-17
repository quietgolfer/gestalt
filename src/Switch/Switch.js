import React, { PropTypes, Component } from 'react';
import classnames from 'classnames/bind';
import styles from './Switch.css';

const cx = classnames.bind(styles);

export default class Switch extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    switched: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    onChange: () => {},
    switched: false,
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.nativeEvent.target.checked);
  }

  render() {
    const {
            switched,
        } = this.props;
    return (
      <label
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
        ></div>
        <input
          checked={switched}
          className={cx('Switch--checkbox')}
          onChange={this.handleChange}
          type="checkbox"
        />
      </label>
    );
  }
}
