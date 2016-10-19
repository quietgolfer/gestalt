import React from 'react';
import { card, md } from 'corkboard';
import CollageGrid from './CollageGrid';
import ExampleGrid from './ExampleGrid';
import { ns } from '../../../.corkboard/cards';

ns('Grid | ClassicGrid');

card('PropTypes',
  md`
\`\`\`js
ClassicGrid.propTypes = {
  columnWidth: React.PropTypes.number, /* default: 236 */
  comp: React.PropTypes.func, /* the component to render */
  gutterWidth: React.PropTypes.number, /* default: 14 */
  items: React.PropTypes.array, /* objects to display in grid */
  loadItems: React.PropTypes.func, /* callback when user scrolls and we need to load more items */
  minCols: React.PropTypes.number, /* default : 3 */
  scrollContainer: React.PropTypes.shape({}), /* default: window */
};
\`\`\`
`
);

card('Fixed width',
  md`With a set number of items, used as a collage component.`,
  <div className="dark-gray" style={{ width: 400 }}>
    <CollageGrid />
  </div>
);

card(
  'Fluid width',
    <div className="dark-gray">
      <ExampleGrid />
    </div>,
  {},
  { stretch: true },
);
