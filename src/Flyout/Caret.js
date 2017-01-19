// @flow
import React, { PropTypes } from 'react';

type Props = {
  direction?: ?'up' | 'right' | 'down' | 'left' | 'none',
  height?: number,
  width?: number,
};

export default function Caret(props: Props) {
  const { direction, height = 24, width = 24 } = props;
  let path;
  switch (direction) {
    case 'up':
      path = <path d="M0 0 L12 12 L24 0" />;
      break;
    case 'right':
      path = <path d="M24 0 L12 12 L24 24" />;
      break;
    case 'down':
      path = <path d="M0 24 L12 12 L24 24" />;
      break;
    case 'left':
      path = <path d="M0 0 L12 12 L0 24" />;
      break;
    default:
  }
  return (
    <svg width={width} height={height}>
      {path}
    </svg>
  );
}

Caret.propTypes = {
  direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  height: PropTypes.number,
  width: PropTypes.number,
};
