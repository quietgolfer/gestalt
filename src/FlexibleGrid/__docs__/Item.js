import React from 'react';
import Image from '../../Image/Image';

export default function Item(props) {
  const {
    data,
  } = props;

  const pinStyles = {
    padding: '0 10px 20px',
  };

  return (
    <div style={pinStyles}>
      <Image
        alt={'Test'}
        color={data.color}
        height={data.height}
        src={data.src}
        width={data.width}
      />
      <div>
        {data.name}
      </div>
    </div>
  );
}

Item.propTypes = {
  data: React.PropTypes.shape({}),
};
