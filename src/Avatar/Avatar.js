import React, { PropTypes } from 'react';
import Image from '../Image/Image';
import Mask from '../Mask/Mask';

export default function Avatar(props) {
  const {
    avatar: {
      size,
      url,
    },
    name,
  } = props;
  return (
    <Mask height={size} type="circle" width={size}>
      <Image
        alt={name}
        color="#EFEFEF"
        height={size}
        src={url}
        width={size}
      />
    </Mask>
  );
}

Avatar.propTypes = {
  avatar: PropTypes.shape({
    size: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};
