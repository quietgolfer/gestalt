import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './TextField.css';

const cx = classnames.bind(styles);

export default class TextField extends Component {

    static propTypes = {
        disabled: PropTypes.bool.isRequired,
        errored: PropTypes.bool.isRequired,
        focused: PropTypes.bool.isRequired
    }

    static defaultProps = {
        disabled: false,
        errored: false,
        focused: false,
        type: 'text'
    }

    constructor(props, context) {
        super(props, context);
    }

    get value() {
        return this.input.value;
    }

    setInputRef = (ref) => {
        this.input = ref;
    }

    render() {
        const {
            disabled,
            errored,
            focused
        } = this.props;

        const cs = cx('TextField',
            {
                'TextField--isDisabled': disabled,
                'TextField--isErrored': errored,
                'TextField--isFocused': focused
            }
        );

        return <input {...this.props} classNames={cs} ref={this.setInputRef} />;
    }
}
