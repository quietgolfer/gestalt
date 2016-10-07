// @flow

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Image.css';

const cx = classnames.bind(styles);

function preloadImg(src, callback) {
  const img = new window.Image();
  img.onload = callback;
  img.src = src;
}

type PlaceholderProps = {
  aspect: number,
  color: string,
};

export function Placeholder(props: PlaceholderProps) {
  const { aspect, color } = props;
  return (
    <div
      className={cx('Image__placeholder')}
      style={{ backgroundColor: color, paddingBottom: `${aspect}%` }}
    >
      <div className={cx('Image__placeholder--wrapper')} />
    </div>
  );
}

Placeholder.propTypes = {
  aspect: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

type ImageProps = {
  alt: string,
  color: string,
  height: number,
  src: string,
  wash?: bool,
  width: number,
};

type ImageState = {
  loaded: boolean,
};

export default class Image extends Component {
  static contextTypes = {
    preloadingSupported: PropTypes.bool.isRequired,
  };

  state: ImageState = {
    loaded: !this.context.preloadingSupported,
  };

  componentDidMount() {
    if (!this.state.loaded) {
      preloadImg(this.props.src, this.handleLoad);
    }
  }

  props: ImageProps;

  handleLoad = () => {
    this.setState({ loaded: true });
  }

  handleError = () => {
    this.setState({ loaded: false });
  }

  render() {
    const {
      alt,
      color,
      height,
      src,
      wash = false,
      width,
    } = this.props;

    const aspect = (height / width) * 100;

    if (!this.state.loaded) {
      return (
        <div>
          <Placeholder aspect={aspect} color={color} />
          <link href={src} rel="preload" />
        </div>
      );
    }

    return (
      <div
        className={cx('Image__placeholder')}
        style={{ backgroundColor: color, paddingBottom: `${aspect}%` }}
      >
        <div className={cx({ wash })}></div>
        <img
          alt={alt}
          className={cx('Image__img')}
          onError={this.handleError}
          onLoad={this.handleLoad}
          src={src}
          style={{ position: 'absolute' }}
        />
      </div>
    );
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  wash: PropTypes.bool,
  width: PropTypes.number.isRequired,
};
