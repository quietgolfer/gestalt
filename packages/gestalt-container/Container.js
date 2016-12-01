// @flow
import React, { Element, PropTypes } from 'react';
import styles from './Container.css';

type Props = {
  children?: Element<any>,
}

export default function Container(props: Props) {
  const { children } = props;
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};
