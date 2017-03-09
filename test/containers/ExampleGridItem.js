import React from 'react';

export default function Item(props) {
  const {
    data,
    itemIdx,
  } = props;

  const pinStyles = {
    border: '1px solid #ff0000',
    background: data.color,
    height: `${data.height}px`
  };

  if (!props.flexible) {
    pinStyles.width = 234;
  }

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
  flexible: React.PropTypes.bool,
  itemIdx: React.PropTypes.number,
};
