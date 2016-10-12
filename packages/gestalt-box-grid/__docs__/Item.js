import React from 'react';

const Item = (props) => {
  const {
    columnWidth,
    data,
  } = props;

  let pinStyles = {};

  if (columnWidth) {
    pinStyles = {
      border: '1px solid #fff',
      width: columnWidth * data.colSpan,
      background: data.color,
      height: `${data.height}px`,
    };
  }

  return (
    <div data-cols={data.colSpan} style={pinStyles}>
      Item: {data.name}<br />
      Columns: {data.colSpan}<br />
      ItemWidth: {columnWidth}
    </div>
  );
};

Item.propTypes = {
  columnWidth: React.PropTypes.number,
  data: React.PropTypes.shape({}),
};

export default Item;
