import React from 'react';
import styles from '../../styles.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export default function Divider() {
  const dividerComposed = cx(
    'border-top',
    'm0',
  );

  const dividerInline = {
    borderBottom: 0,
    borderLeft: 0,
  };

  return <hr className={dividerComposed} style={dividerInline} />;
}
