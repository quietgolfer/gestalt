/* @flow */
import React, { PropTypes } from 'react';

type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export default function Column({ children, span = 12 }: { children?: any, span: Columns }) {
  return <div className={`col-${span}`}>{children}</div>;
}

Column.propTypes = {
  children: PropTypes.node,
  span: PropTypes.number.isRequired,
};
