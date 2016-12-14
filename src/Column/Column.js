/* @flow */
import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Column.css';

type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
  children?: any,
  xs: Columns,
  sm?: Columns,
  md?: Columns,
  lg?: Columns,
};

export default function Column(props: Props) {
  const { children, xs, sm, md, lg } = props;
  const cs = classnames(
    styles.col,
    styles[`col-${xs}`],
    (sm ? styles[`sm-col-${sm}`] : null),
    (md ? styles[`md-col-${md}`] : null),
    (lg ? styles[`lg-col-${lg}`] : null),
  );
  return <div className={cs}>{children}</div>;
}

Column.propTypes = {
  children: PropTypes.node,
  xs: PropTypes.number.isRequired,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};
