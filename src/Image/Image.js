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
    naturalHeight: PropTypes.number.isRequired,
    naturalWidth: PropTypes.number.isRequired,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    sizes: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
  };

  static defaultProps = {
    color: 'transparent',
  }

  props: {
    alt: string,
    children?: any,
    color: string,
    naturalHeight: number,
    naturalWidth: number,
    onError?: () => void,
    onLoad?: () => void,
    sizes?: string,
    src: string,
    srcSet?: {[key: string]: string},
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
      naturalHeight,
      naturalWidth,
      sizes,
      src,
      srcSet,
    } = this.props;

    const aspect = (naturalHeight / naturalWidth) * 100;
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
