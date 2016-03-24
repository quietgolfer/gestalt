import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './TextField.css';

export default class TextField extends Component {

    static propTypes = {
        classNames: PropTypes.arrayOf(PropTypes.string),
        disabled: PropTypes.bool,
        focused: PropTypes.bool,
        id: PropTypes.string,
        name: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onValidation: PropTypes.func,
        placeholder: PropTypes.string,
        type: PropTypes.oneOf(['url', 'text', 'password']),
        url: PropTypes.bool,
        validators: PropTypes.arrayOf(PropTypes.func),
        value: PropTypes.string,
    }

    static defaultProps = {
        validators: [],
        type: 'text'
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            isFocused: this.props.focused || false,
            value: this.props.value,
            hasChanged: this.props.value !== undefined
        };
    }

    componentDidMount() {
        if (this.state.isFocused) {
            this._input.focus();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
    }

    handleChange(e) {
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
        let validatorErrors = this.runValidators(e.target.value);
        if (this.props.onValidation) {
            this.props.onValidation(validatorErrors);
        }
        this.setState({value: e.target.value, hasChanged: true});
    }

    getId() {
        return this.props.id;
    }

    getValue() {
        return this.state.value;
    }

    runValidators(value) {
        let validatorErrors = [];
        if (this.state.hasChanged) {
            for (let validator of this.props.validators){
                let data = validator(value);
                validatorErrors = validatorErrors.concat(data['errors']);
            }
        }
        return validatorErrors;
    }

    render() {
        const validatorErrors = this.runValidators(this.state.value);
        const modifiers = {};
        modifiers[styles['TextField--has-error']] = this.state.hasChanged && validatorErrors.length > 0;

        const myClasses = classNames(
            styles.TextField,
            this.props.classNames,
            modifiers
        );

        return (
            <input
                className={myClasses}
                disabled={this.props.disabled ? 'disabled' : ''}
                id={this.props.id}
                name={this.props.name}
                onBlur={this.props.onBlur ? this.props.onBlur.bind(this) : null}
                onChange={this.handleChange.bind(this)}
                onClick={this.props.onClick ? this.props.onClick.bind(this) : null}
                placeholder={this.props.placeholder}
                ref={(comp) => this._input = comp}
                type={this.props.type}
                value={this.state.value}
            />
        );
    }
}
