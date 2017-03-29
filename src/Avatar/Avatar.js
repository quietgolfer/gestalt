// @flow
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Box from '../Box/Box';
import Image from '../Image/Image';
import Mask from '../Mask/Mask';
import styles from './Avatar.css';
import colors from '../Colors.css';

const Square = (props: *) => (
  <Box {...props} postition="relative">
    <Box dangerouslySetInlineStyle={{ __style: { paddingBottom: '100%' } }} position="relative" />
    <Box>{props.children}</Box>
  </Box>
);

const DefaultAvatar = ({ name, size }: { name: string, size: number }) => {
  const firstInitial = [...name][0].toUpperCase();
  return (
    <Square
      alignItems="center"
      aria-label={name}
      color="gray"
      dangerouslySetInlineStyle={{
        __style: { fontSize: size * 0.5 },
      }}
      justifyContent="center"
      shape="circle"
      xs={{ display: 'flex' }}
    >
      <span className={classnames(colors.white, 'bold', 'antialiased')}>{firstInitial}</span>
    </Square>
  );
};


export default class Avatar extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  };

  state = {};

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ width: this.el.clientWidth });
  }

  el: HTMLElement;

  registerEl = (el: HTMLElement) => {
    this.el = el;
  }

  props: {|
    name: string,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    src?: string,
  |};

  render() {
    const {
      name,
      src,
      size,
    } = this.props;

    const className = size ? styles[size] : 'col-12';

    if (!this.state.width) {
      return <div className={className} ref={this.registerEl} />;
    }

    if (!src) {
      return (
        <div className={className}>
          <DefaultAvatar name={name} size={this.state.width} />
        </div>
      );
    }

    return (
      <div className={className}>
        <Mask shape="circle" wash>
          <Image
            alt={name}
            color={'#efefef'}
            naturalHeight={1}
            naturalWidth={1}
            src={src}
          />
        </Mask>
      </div>
    );
  }
}
