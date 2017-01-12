// @flow
import React from 'react';
import { card, md } from 'corkboard';
import CollageGrid from './CollageGrid';
import ExampleGrid from './ExampleGrid';
import { ns } from '../../../.corkboard/cards';

ns('Grid | FlexibleGrid');

card('PropTypes',
  md`
\`\`\`js
FlexibleGrid.propTypes = {
  comp: React.PropTypes.func, /* component to render */
  idealItemWidth: React.PropTypes.number, /* The preferred/target item width. */
  items: React.PropTypes.array, /* objects to display in grid */
  loadItems: React.PropTypes.func, /* callback when user scrolls and we need to load more items */
  scrollContainer: React.PropTypes.shape({}), /* default: window */
};
\`\`\`
`);

card('Fixed width container',
  md`With a set number of items, used as a collage component.`,
  <div className="dark-gray" style={{ width: 400 }}>
    <CollageGrid />
  </div>
);

card('Fluid width container',
  <div className="dark-gray">
    <ExampleGrid />
  </div>,
  {},
  { stretch: true },
);
