// @flow

import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import styles from './Label.css';

const cx = classnames.bind(styles);

// TODO: Remove '?' from children when Flow issue fixed. https://github.com/facebook/flow/issues/1355
type Props = {
  children?: any,
  htmlFor: string,
};

export default function Label(props: Props) {
  const { children, htmlFor } = props;

  return (
    <label className={cx('label')} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
};
