import React from 'react';

export default function Item(props) {
  const {
    data,
    itemIdx,
  } = props;

  const pinStyles = {
    border: '1px solid #ff0000',
    width: '234px',
    background: data.color,
    height: `${data.height}px`,
  };

  if (typeof window !== 'undefined' && window.itemHeightOverrides && window.itemHeightOverrides[itemIdx]) {
    pinStyles.height = `${window.itemHeightOverrides[itemIdx]}px`;
  }

  return (
    <div style={pinStyles}>
      {data.name}
    </div>
  );
}

Item.propTypes = {
  data: React.PropTypes.shape({}),
  itemIdx: React.PropTypes.number,
};
