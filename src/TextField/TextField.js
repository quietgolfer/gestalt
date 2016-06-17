import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './TextField.css';

const cx = classnames.bind(styles);

export default class TextField extends Component {

  setInputRef = (ref) => {
    this.input = ref;
  }

  get value() {
    return this.input.value;
  }

  render() {
    const {
            disabled,
            errored,
            focused,
        } = this.props;

    const cs = cx('TextField',
      {
        'TextField--isDisabled': disabled,
        'TextField--isErrored': errored,
        'TextField--isFocused': focused,
      }
        );

    return <input {...this.props} className={cs} ref={this.setInputRef} />;
  }
}

TextField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  errored: PropTypes.bool.isRequired,
  focused: PropTypes.bool.isRequired,
};

TextField.defaultProps = {
  disabled: false,
  errored: false,
  focused: false,
  type: 'text',
};
