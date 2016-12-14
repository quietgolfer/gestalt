import React from 'react';

export default function Item(props) {
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
