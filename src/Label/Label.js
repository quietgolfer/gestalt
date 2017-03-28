// @flow
import React, { PropTypes } from 'react';
import styles from './Label.css';

type Props = {|
  children?: any,
  htmlFor: string,
|};

export default function Label(props: Props) {
  const { children, htmlFor } = props;

  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
};
