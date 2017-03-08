// @flow
import React from 'react';
import { card, md } from 'corkboard';
import ExampleMasonry from './ExampleMasonry';
import { ns } from '../../../.corkboard/cards';

ns('Masonry');

card(
  md`
Masonry creates a deterministic grid layout, positioning items based on available vertical space.
It contains performance optimizations like virtualization and server rendering, as well as support for infinite scrolling.
`,
  md`
  \`\`\`js
Masonry.propTypes = {
  // If you are using items that are not this size and
  // happen to require a fixed width, you should specify a \`columnWidth\` that matches the width
  // of your items in order to achieve the desired behavior. However we recommend using flexible width items.
  // default: 236
  columnWidth: React.PropTypes.number,

  // A function or React component that renders the item you would like displayed in the grid.
  comp: React.PropTypes.func,

  // This is the width inbetween grid items both vertically and horizontally.
  // If you also add \`padding\` to your items the effect will be additive and will result in a larger gutter than
  // what you specify in this prop.
  // default: 14
  gutterWidth: React.PropTypes.number,

  // An array of items to display that contains the information that \`comp\` needs to render.
  items: React.PropTypes.array,

  // A callback when the user scrolls and you need to load more items into the grid.
  loadItems: React.PropTypes.func,

  // Adjust this if your layout requires something else.
  // default: 3
  minCols: React.PropTypes.number,

  // The default for this is 'window'. If you need to scroll within a smaller container, you can
  // pass an \`HTMLElement\` into this prop and the scroll will attach to it instead.
  scrollContainer: React.PropTypes.shape({}),
};
\`\`\`
`
);

card('Fluid number of columns',
  md`The number of columns in this grid changes responsively based on the width of the parent.
  \`\`\`jsx
    <Masonry
      comp={Item}
      items={this.state.pins}
      loadItems={this.loadItems}
      minCols={1}
    />
  \`\`\`
  `);


card('Example of fluid number of columns',
  <div className="dark-gray">
    <ExampleMasonry />
  </div>,
  {},
  { stretch: true },
);
