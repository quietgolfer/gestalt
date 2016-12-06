// @flow
import React, { PropTypes } from 'react';
import Mask from 'gestalt-mask';

type PropType = {
  children?: any,
  contentAspectRatio: number,
  height: number,
  width: number,
};

export default function Letterbox(
  {
    children,
    contentAspectRatio,
    height,
    width,
  }: PropType) {
  let contentHeight;
  let contentWidth;
  let offsetLeft;
  let offsetTop;

  // wide content
  if (contentAspectRatio > 1) {
    contentHeight = height;
    contentWidth = contentAspectRatio * width;

    offsetTop = 0;
    offsetLeft = (contentWidth - width) / -2;

  // tall + square content
  } else {
    contentHeight = height / contentAspectRatio;
    contentWidth = width;

    offsetTop = (contentHeight - height) / -2;
    offsetLeft = 0;
  }

  return (
    <Mask width={width} height={height}>
      <div style={{ marginTop: offsetTop, marginLeft: offsetLeft }}>
        <Mask width={contentWidth} height={contentHeight}>
          {children}
        </Mask>
      </div>
    </Mask>
  );
}

Letterbox.propTypes = {
  children: PropTypes.node,
  contentAspectRatio: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
