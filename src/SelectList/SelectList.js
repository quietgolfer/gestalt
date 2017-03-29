// @flow
import React, { Component, PropTypes } from 'react';
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
    })).isRequired,
    value: PropTypes.string,
  };

  static defaultProps = {
    options: [],
  }

  props: {|
    id: string,
    name?: string,
    onChange: (e: { +value: string }) => void,
    options: Array<{
      label: string,
      value: string,
    }>,
    value?: ?string,
  |};

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
          <Icon icon="arrow-down" size={14} color="darkGray" accessibilityLabel="" />
        </Box>
        <select
          className={styles.select}
          id={id}
          name={name}
          onBlur={this.handleOnChange}
          onChange={this.handleOnChange}
          value={value}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Box>
    );
  }
}
