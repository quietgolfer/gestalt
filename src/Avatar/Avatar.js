// @flow
import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import Image from '../Image/Image';
import Mask from '../Mask/Mask';
import DefaultAvatar from './DefaultAvatar';
import styles from './Avatar.css';

const cx = classnames.bind(styles);

type AvatarProps = {
  name: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  src?: string,
}

export default function Avatar(props: AvatarProps) {
  const {
    name,
    size,
    src,
    } = props;

  if (!src) {
    return <DefaultAvatar name={name} size={size} />;
  }

  const classes = cx(size, { responsive: !size });

  return (
    <div className={classes}>
      <Mask shape="circle" wash>
        <Image
          alt={name}
          color={'#efefef'}
          height={1}
          src={src}
          width={1}
        />
      </Mask>
    </div>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  src: PropTypes.string,
};
