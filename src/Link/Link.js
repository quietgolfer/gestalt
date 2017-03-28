// @flow
import React, { PropTypes } from 'react';
import cx from 'classnames';
import styles from './Link.css';

const contains = (key, arr) => arr.indexOf(key) >= 0;
const omit = (keys, obj) => Object.keys(obj).reduce((acc, k) => {
  if (contains(k, keys)) {
    return acc;
  }
  return {
    ...acc,
    [k]: obj[k],
  };
}, {});

const PropBlacklist = [
  'aria-hidden',
  'className',
  'color',
  'inline',
  'style',
];

type LinkProps = {|
  // eslint-disable-next-line react/no-unused-prop-types
  children?: any,
  color: 'white' | 'darkGray' | 'gray' | 'red' | 'blue',
  // eslint-disable-next-line react/no-unused-prop-types
  href: string,
  inline?: boolean,
|};

type GestaltContext = {
  inputDevice: '' | 'key' | 'mouse' | 'touch'
};

export default function Link(props: LinkProps, context: GestaltContext) {
  const { inputDevice = 'key' } = context;
  const { color = 'darkGray', inline = false } = props;
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...omit(PropBlacklist, props)}
      className={
        cx(
          styles.link,
          styles[color],
          (inline ? styles.inline : styles.block),
          (inputDevice !== 'key' ? styles.disableFocusOutline : '')
        )
      }
    />
  );
}

Link.contextTypes = {
  inputDevice: React.PropTypes.string
};

Link.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['white', 'darkGray', 'gray', 'red', 'blue']),
  // eslint-disable-next-line react/no-unused-prop-types
  href: PropTypes.string.isRequired,
  inline: PropTypes.bool
};
