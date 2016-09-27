import React from 'react';
import ExampleGrid from './ExampleGrid';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('Grid | BoxGrid');

card(
  md`
The BoxGrid is a simple 2D box packing grid with support for displaying items across multiple
columns. The box grid is able to deterministicly render given a fixed dataset, but it is
not able to do so across different page sizes. We avoid sorting the items, which would result in
fewer cases of whitespace, but we believe would result in a worse user experience.

This component is currently in testing and it may change drastically in the future.
`);

card('PropTypes',
  md`
  \`\`\`js
  BoxGrid.propTypes = {
    comp: React.PropTypes.func, /* component to render */
    items: React.PropTypes.array, /* objects to display in grid */
    loadItems: React.PropTypes.func, /* callback when user scrolls and we need to load more items */
    maxItemWidth: React.PropTypes.number, /* default: 300 */
    minItemWidth: React.PropTypes.number, /* default: 236 */
    scrollContainer: React.PropTypes.object, /* default: window */
  };
  \`\`\`
  `);

card('Fluid width container',
  <div>
    <ExampleGrid />
  </div>,
  {},
  { stretch: true },
);
