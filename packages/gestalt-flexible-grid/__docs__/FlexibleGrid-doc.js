import React from 'react';
import CollageGrid from './CollageGrid';
import ExampleGrid from './ExampleGrid';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('Grid | FlexibleGrid');

card('PropTypes',
  md`
  \`\`\`js
  FlexibleGrid.propTypes = {
    comp: React.PropTypes.func, /* component to render */
    items: React.PropTypes.array, /* objects to display in grid */
    loadItems: React.PropTypes.func, /* callback when user scrolls and we need to load more items */
    maxItemWidth: React.PropTypes.number, /* default: 300 */
    minItemWidth: React.PropTypes.number, /* default: 236 */
    scrollContainer: React.PropTypes.object, /* default: window */
  };
  \`\`\`
  `);

card('Fixed width container',
  md`With a set number of items, used as a collage component.`,
  <div style={{ width: 400 }}>
    <CollageGrid />
  </div>
);

card(
  'Fluid width container',
  md`The Pinterest grid.`,
  <div>
    <ExampleGrid />
  </div>,
  {},
  { stretch: true },
);
