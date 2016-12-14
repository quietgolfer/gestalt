// @flow
/* global SyntheticEvent */
/* eslint-disable react/no-did-mount-set-state */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import styles from './Image.css';

type ImageProps = {
  alt: string,
  color: string,
  height: number,
  onError?: (e: SyntheticEvent) => {},
  onLoad?: (e: SyntheticEvent) => {},
  sizes?: string,
  src: string,
  srcSet?: {[key: string]: string},
  width: number,
};

export default class Image extends Component {

  state = {
    loaded: false,
  };

  componentDidMount() {
    if (this.img && this.img.complete) {
      this.setState({ loaded: true });
    }
  }

  img: HTMLElement;
  props: ImageProps;

  handleLoad = (e: SyntheticEvent) => {
    this.setState({ loaded: true });
    if (this.props.onLoad) {
      this.props.onLoad(e);
    }
  }

  handleError = (e: SyntheticEvent) => {
    this.setState({ loaded: false });
    if (this.props.onError) {
      this.props.onError(e);
    }
  }

  render() {
    const {
      alt,
      color,
      height,
      sizes,
      src,
      srcSet,
      width,
    } = this.props;
    const { loaded } = this.state;

    const img = (
      <img
        alt={alt}
        className={cx(styles.img, styles[loaded ? 'loaded' : 'pending'])}
        onError={this.handleError}
        onLoad={this.handleLoad}
        ref={(el) => { this.img = el; }}
        sizes={sizes}
        src={src}
        srcSet={srcSet}
      />
    );

    if (loaded) {
      return img;
    }

    const aspect = (height / width) * 100;
    const style = {
      backgroundColor: color,
      paddingBottom: `${aspect}%`,
    };

    return (
      <div className={styles.container} style={style}>
        {src ? img : null}
      </div>
    );
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcSet: PropTypes.string,
  width: PropTypes.number.isRequired,
};
