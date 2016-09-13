import React from 'react';

export default function Item(props) {
  const {
    data,
  } = props;

  let pinStyles = {
    border: '1px solid #fff',
    width: '234px',
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
  data: React.PropTypes.object,
};
