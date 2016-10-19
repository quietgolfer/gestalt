import React from 'react';

const Item = (props) => {
  const {
    columnWidth,
    data,
  } = props;

  let containerStyles = {};
  let contentStyles = {};

  if (columnWidth) {
    containerStyles = {
      padding: 1,
      width: columnWidth * data.colSpan,
      height: `${data.height}px`,
      boxSizing: 'border-box',
    };
    contentStyles = {
      padding: 10,
      height: '100%',
      boxSizing: 'border-box',
      background: data.color,
    };
  }

  return (
    <div data-cols={data.colSpan} style={containerStyles}>
      <div style={contentStyles}>
        Item: {data.name}<br />
        Columns: {data.colSpan}<br />
        Column Width: {columnWidth}
      </div>
    </div>
  );
};

Item.propTypes = {
  columnWidth: React.PropTypes.number,
  data: React.PropTypes.shape({}),
};

export default Item;
