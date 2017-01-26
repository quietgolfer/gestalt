// @flow
import React, { PropTypes } from 'react';
import Box from '../Box/Box';

type Props = {
  children?: any,
}

export default function Container(props: Props) {
  const { children } = props;
  return (
    <Box
      margin={{ left: 'auto', right: 'auto' }}
      dangerouslySetInlineStyle={{ __style: { maxWidth: 800 } }}
    >
      {children}
    </Box>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};
