import React from 'react';

export default function Item(props) {
  const {
    data,
  } = props;

  const pinStyles = {
    border: '1px solid #fff',
    width: '100%',
    background: data.color,
    height: `${data.height}px`,
  };

  return (
    <div style={pinStyles}>
      {data.name}
    </div>
  );
}

Item.propTypes = {
  data: React.PropTypes.shape({}),
};
