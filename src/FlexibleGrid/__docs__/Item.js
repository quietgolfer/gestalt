// @flow
import React from 'react';
import Image from '../../Image/Image';

/* disable until eslint issue is fixed https://github.com/yannickcr/eslint-plugin-react/issues/819 */
/* eslint-disable react/no-unused-prop-types */
type Props = {|
  data: {
    height: number,
    color: string,
    name: string,
    src: string,
    width: number,
  },
|};

export default function Item(props: Props) {
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
