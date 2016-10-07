// @flow
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import Heading from 'gestalt-heading';
import Image from 'gestalt-image';
import Mask from 'gestalt-mask';
import styles from './Avatar.css';

const cx = classnames.bind(styles);

type DefaultAvatarProps = {
  initial?: string,
  name: string,
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
};

function DefaultAvatar(props: DefaultAvatarProps) {
  const { initial, name, size } = props;
  const firstInitial = initial || name.charAt(0).toUpperCase();
  const classes = cx(size, 'defaultAvatar');

  return (
    <div aria-label={name} className={classes}>
      <Heading size={size}>{firstInitial}</Heading>
    </div>
  );
}

type AvatarProps = {
  initial?: string,
  name: string,
  size: 'xs' | 's' | 'm' | 'l' | 'xl',
  src?: string,
  wash?: bool,
}

export default function Avatar(props: AvatarProps) {
  const {
    initial,
    name,
    size,
    src,
    wash = false,
  } = props;

  if (!src) {
    return (
      <DefaultAvatar initial={initial} name={name} size={size} />
    );
  }

  const classes = cx(size);

  return (
    <div className={classes}>
      <Mask shape="circle">
        <Image
          alt={name}
          color={'#efefef'}
          height={1}
          src={src}
          wash={wash}
          width={1}
        />
      </Mask>
    </div>
  );
}

Avatar.propTypes = {
  initial: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
  src: PropTypes.string,
  wash: PropTypes.bool,
};
