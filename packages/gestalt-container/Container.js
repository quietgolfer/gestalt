// @flow
import React, { PropTypes } from 'react';
import styles from './Container.css';

export default function Container({ children }: { children?: any }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};
