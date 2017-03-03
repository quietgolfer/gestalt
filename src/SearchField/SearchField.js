// @flow

import React, { Component, PropTypes } from 'react';
import styles from './SearchField.css';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';

export default class SearchField extends Component {
  static propTypes = {
    aria: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  state = {
    focused: false,
    hovered: false,
  };

  props: {
    // eslint-disable-next-line react/no-unused-prop-types
    aria: { label: string },
    id: string,
    onChange: ({ value: string }) => void,
    onClear: () => void,
    placeholder?: string,
    value?: string,
  };

  handleChange = (e: Event) => {
    if (e.target instanceof HTMLInputElement) {
      this.props.onChange({ value: e.target.value });
    }
  }

  handleMouseEnter = () => this.setState({ hovered: true });
  handleMouseLeave = () => this.setState({ hovered: false });
  handleFocus = () => this.setState({ focused: true });
  handleBlur = () => this.setState({ focused: false });

  render() {
    const {
      aria: { label },
      id,
      placeholder,
      onClear,
      value,
    } = this.props;

    // This mirrors the built in browser behavior. If there's a value, show the
    // clear button if you're hovering or if you've focused on the field
    const showClear = (
      this.state.focused || this.state.hovered
    ) && value && value.length > 0;

    return (
      <Box
        xs={{ display: 'flex' }}
        position="relative"
        alignItems="center"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        <Box
          dangerouslySetInlineStyle={{ __style: { pointerEvents: 'none' } }}
          position="absolute"
          left
          margin={{ left: 2 }}
        >
          <Icon icon="search" ariaLabel="" />
        </Box>
        <input
          aria-label={label}
          className={styles.input}
          id={id}
          onChange={this.handleChange}
          placeholder={placeholder}
          role="searchbox"
          type="search"
          value={value}
        />
        {showClear && (
          <Box position="absolute" right padding={{ x: 1 }}>
            <IconButton
              icon="clear"
              label=""
              size="sm"
              onClick={onClear}
              tabIndex={-1}
            />
          </Box>
        )}
      </Box>
    );
  }
}
