// @flow
import React from 'react';

/* disable until eslint issue is fixed https://github.com/yannickcr/eslint-plugin-react/issues/819 */
/* eslint-disable react/no-unused-prop-types */
type Props = {|
  data: {
    height: number,
    color: string,
    name: string,
  },
|};

export default function Item(props: Props) {
  const {
    data,
  } = props;

  const pinStyles = {
    padding: 1,
    width: '234px',
    height: `${data.height}px`,
    boxSizing: 'border-box',
  };

  const contentStyles = {
    padding: 10,
    height: '100%',
    boxSizing: 'border-box',
    background: data.color,
  };

  return (
    <div style={pinStyles}>
      <div style={contentStyles}>
        {data.name}
      </div>
    </div>
  );
}

Item.propTypes = {
  data: React.PropTypes.shape({}),
};
