/* @flow */
import React, { Element, PropTypes } from 'react';

type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
  children?: Element<any>,
  span: Columns,
}

export default function Column(props: Props) {
  const { children, span } = props;
  return <div className={`col-${span}`}>{children}</div>;
}

Column.propTypes = {
  children: PropTypes.node,
  span: PropTypes.number.isRequired,
};
