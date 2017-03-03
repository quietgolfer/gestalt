// @flow
/* global SyntheticEvent */
import React, { Component, PropTypes } from 'react';
import Box from '../Box/Box';
import styles from './Image.css';

export default class Image extends Component {

  static propTypes = {
    alt: PropTypes.string.isRequired,
    children: PropTypes.node,
    color: PropTypes.string,
    height: PropTypes.number.isRequired,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    sizes: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    width: PropTypes.number.isRequired,
  };

  static defaultProps = {
    color: 'transparent',
  }

  props: {
    alt: string,
    children?: any,
    color: string,
    height: number,
    onError?: () => void,
    onLoad?: () => void,
    sizes?: string,
    src: string,
    srcSet?: {[key: string]: string},
    width: number,
  };

  handleLoad = () => {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  handleError = () => {
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    const {
      alt,
      color,
      children,
      height,
      sizes,
      src,
      srcSet,
      width,
    } = this.props;

    const aspect = (height / width) * 100;
    const style = {
      backgroundColor: color,
      paddingBottom: `${aspect}%`,
    };

    return (
      <Box position="relative" dangerouslySetInlineStyle={{ __style: style }}>
        <img
          alt={alt}
          className={styles.img}
          onError={this.handleError}
          onLoad={this.handleLoad}
          sizes={sizes}
          src={src}
          srcSet={srcSet}
        />
        {children && (
          <Box position="absolute" top left bottom right overflow="hidden">
            {children}
          </Box>
        )}
      </Box>
    );
  }
}
