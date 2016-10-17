// @flow
import React, { Element, PropTypes } from 'react';
import ReactResponive from 'react-responsive';
import breakpoints from './breakpoints';

type Props = {
  children?: Element<any>,
  size: 'sm' | 'md' | 'lg',
}

export default function MediaQuery(props: Props) {
  const { children, size } = props;

  const mediaQuery = breakpoints[size];

  return (
    <ReactResponive query={mediaQuery}>
      {children}
    </ReactResponive>
  );
}

MediaQuery.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(Object.keys(breakpoints)).isRequired,
};
