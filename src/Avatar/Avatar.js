// @flow
import React, { PropTypes } from 'react';
import Box from '../Box/Box';
import Image from '../Image/Image';
import Mask from '../Mask/Mask';
import styles from './Avatar.css';

const Square = (props: *) => (
  <Box {...props} position="relative">
    <Box
      dangerouslySetInlineStyle={{ __style: { paddingBottom: '100%' } }}
      position="relative"
    />
    <Box position="absolute" top left bottom right>{props.children}</Box>
  </Box>
);

const DefaultAvatar = ({ name }: { name: string }) => {
  const firstInitial = [...name][0].toUpperCase();
  return (
    <Square color="gray" shape="circle">
      <svg
        width="100%"
        viewBox="-50 -50 100 100"
        version="1.1"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{name}</title>
        <text
          fontSize="50px"
          lineHeight="50px"
          fontWeight="bold"
          fill="#FFFFFF"
          dominantBaseline="central"
          textAnchor="middle"
        >
          {firstInitial}
        </text>
      </svg>
    </Square>
  );
};

type AvatarProps = {|
  name: string,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  src?: string,
|};

export default function Avatar({ name, src, size }: AvatarProps) {
  const className = size ? styles[size] : 'col-12';
  return (
    <div className={className}>
      {src ? (
        <Mask shape="circle" wash>
          <Image
            alt={name}
            color="#EFEFEF"
            naturalHeight={1}
            naturalWidth={1}
            src={src}
          />
        </Mask>
      ) : (
        <DefaultAvatar name={name} />
      )}
    </div>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
