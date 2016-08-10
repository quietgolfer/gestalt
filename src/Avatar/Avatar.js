// @flow
import React, { PropTypes } from 'react';
import Image from '../Image/Image';
import Mask from '../Mask/Mask';

type Props = {
  size: number,
  src: string,
  name: string,
};

export default function Avatar(props: Props) {
  const {
    size,
    src,
    name,
  } = props;

  return (
    <Mask height={size} type="circle" width={size}>
      <Image
        alt={name}
        color="#EFEFEF"
        height={size}
        src={src}
        width={size}
      />
    </Mask>
  );
}

Avatar.propTypes = {
  size: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
