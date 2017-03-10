// @flow
import React, { PropTypes } from 'react';
import Box from '../../Box/Box';
import Image from '../../Image/Image';
import Text from '../../Text/Text';

/* disable until eslint issue is fixed https://github.com/yannickcr/eslint-plugin-react/issues/819 */
/* eslint-disable react/no-unused-prop-types */
type Props = {
  data: {
    height: number,
    color: string,
    name: string,
    src: string,
    width: number,
  },
};

export default function Item(props: Props) {
  const {
    data,
  } = props;

  return (
    <Box>
      <Image
        alt={'Test'}
        color={data.color}
        height={data.height}
        src={data.src}
        width={data.width}
      />
      <Text size="xs">{data.name}</Text>
    </Box>
  );
}

Item.propTypes = {
  data: React.PropTypes.shape({
    height: PropTypes.number,
    color: PropTypes.string,
    name: PropTypes.string,
    src: PropTypes.string,
    width: PropTypes.number
  }),
};
