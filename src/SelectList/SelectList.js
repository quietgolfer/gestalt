// @flow
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import styles from './SelectList.css';

export default class SelectList extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })).isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    options: [],
  }

  props: {
    id: string,
    name?: string,
    onChange: (e: { +value: string }) => void,
    options: Array<{
      label: string,
      value: string,
      disabled?: bool,
    }>,
    placeholder?: string,
    value?: ?string,
  };

  handleOnChange = (e: Event) => {
    if (
      e.target instanceof HTMLSelectElement &&
      this.props.value !== e.target.value
    ) {
      this.props.onChange({ value: e.target.value });
    }
  }

  render() {
    const {
      id,
      name,
      options,
      value,
      placeholder,
    } = this.props;

    return (
      <Box
        color="lightGray"
        position="relative"
        shape="rounded"
        xs={{ column: 12 }}
      >
        <Box
          alignItems="center"
          bottom
          dangerouslySetInlineStyle={{ __style: { paddingTop: 4 } }}
          padding={{ x: 2 }}
          position="absolute"
          right
          top
          xs={{ display: 'flex' }}
        >
          <Icon icon="arrow-down" size={14} color="dark-gray" ariaLabel="" />
        </Box>
        <select
          className={classnames(styles.select, {
            [styles.empty]: placeholder && !value,
            [styles.filled]: !placeholder || value,
          })}
          id={id}
          name={name}
          onBlur={this.handleOnChange}
          onChange={this.handleOnChange}
          value={value}
        >
          {
            placeholder && (
              <option key="_placeholder" disabled selected hidden>{placeholder}</option>
            )
          }
          {options.map(option => (
            <option key={option.value} value={option.value} disabled={!!option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      </Box>
    );
  }
}
