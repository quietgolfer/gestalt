/* @flow */
import React, { PropTypes } from 'react';
import Box from '../Box/Box';

type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
  children?: any,
  xs: Columns,
  sm?: Columns,
  md?: Columns,
  lg?: Columns,
};

export default function Column(props: Props) {
  const { children, xs, sm, md, lg } = props;
  return (
    <Box
      xs={{ display: 'inlineBlock', column: xs }}
      sm={{ column: sm }}
      md={{ column: md }}
      lg={{ column: lg }}
      dangerouslySetInlineStyle={{ __style: { verticalAlign: 'top' } }}
    >
      {children}
    </Box>
  );
}

Column.propTypes = {
  children: PropTypes.node,
  xs: PropTypes.number.isRequired,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};
