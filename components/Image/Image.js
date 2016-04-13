import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Image.css';

const cx = classnames.bind(styles);

function preloadImg(src, cb) {
    const img = new window.Image();
    img.onload = cb;
    img.src = src;
}

export function Placeholder(props) {
    const { aspect, color, children } = props;
    return (
        <div className={cx('Image__placeholder')} style={{backgroundColor: color, paddingBottom: `${aspect}%`}}>
            <div className={cx('Image__placeholder-wrapper')}>
                <div className={cx('Image__placeholder-text')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

Placeholder.propTypes = {
    aspect: PropTypes.number.isRequired,
    children: PropTypes.node,
    color: PropTypes.string.isRequired
};

export default class Image extends Component {
    static contextTypes = {
        preloadingSupported: PropTypes.bool.isRequired
    };

    static defaultProps = {
        color: '#EFEFEF'
    }

    static propTypes = {
        alt: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        height: PropTypes.number.isRequired,
        placeholder: PropTypes.node,
        src: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired
    };

    constructor(props, context) {
        super(props);
        this.state = {
            loaded: !context.preloadingSupported,
        };
    }

    componentDidMount() {
        this.handleLoad = this._handleLoad.bind(this);
        this.handleError = this._handleError.bind(this);
        if (!this.state.loaded) {
            preloadImg(this.props.src, this.handleLoad);
        }
    }

    _handleLoad() {
        this.setState({loaded: true});
    }

    _handleError() {
        this.setState({loaded: false});
    }

    render() {
        const {
            alt,
            color,
            height,
            placeholder,
            src,
            width
        } = this.props;

        const aspect = (height / width) * 100;

        if (!this.state.loaded) {
            const text = placeholder || alt;
            return (
                <div>
                    <Placeholder aspect={aspect} color={color}>
                        {text}
                    </Placeholder>
                    <link href={src} rel="preload" />
                </div>
            );
        } else {
            return (
                <div className={cx('Image__placeholder')} style={{backgroundColor: color, paddingBottom: `${aspect}%`}}>
                    <img
                        alt={alt}
                        className={cx('Image__img')}
                        onError={this.handleError}
                        onLoad={this.handleLoad}
                        src={src}
                        style={{position: 'absolute'}}
                    />
                </div>
            );
        }
    }
}
