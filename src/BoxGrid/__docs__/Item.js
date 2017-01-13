// @flow
import React from 'react';

/* disable until eslint issue is fixed https://github.com/yannickcr/eslint-plugin-react/issues/819 */
/* eslint-disable react/no-unused-prop-types */
type Props = {
  columnWidth: number,
  data: {
    colSpan: number,
    height: number,
    color: string,
    name: string,
  },
  itemIdx: number,
};

const Item = (props: Props) => {
  const {
    columnWidth,
    data,
    itemIdx,
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

    if (typeof window !== 'undefined' && window.itemHeightOverrides && window.itemHeightOverrides[itemIdx]) {
      containerStyles.height = `${window.itemHeightOverrides[itemIdx]}px`;
    }
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
  itemIdx: React.PropTypes.number,
};

export default Item;
