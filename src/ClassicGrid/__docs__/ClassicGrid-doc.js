// @flow
import React from 'react';
import { card, md } from 'corkboard';
import CollageGrid from './CollageGrid';
import ExampleGrid from './ExampleGrid';
import { ns } from '../../../.corkboard/cards';

ns('ClassicGrid');

card('PropTypes',
  md`
\`\`\`js
ClassicGrid.propTypes = {
  columnWidth: React.PropTypes.number, /* default: 236 */
  comp: React.PropTypes.func,
  gutterWidth: React.PropTypes.number, /* default: 14 */
  items: React.PropTypes.array,
  loadItems: React.PropTypes.func,
  minCols: React.PropTypes.number, /* default: 3 */
  scrollContainer: React.PropTypes.shape({}),
};
\`\`\`
`,
  md`
  ## Additional Information
  \`columnWidth\`: If you are using items that are not this size and
  happen to require a fixed width, you should specify a \`columnWidth\` that matches the width
  of your items in order to achieve the desired behavior. However we recommend using flexible width items.

  \`comp\`: A function or React component that renders the item you would like displayed in the grid.

  \`gutterWidth\`: This is the width inbetween grid items both vertically and horizontally.
  If you also add \`padding\` to your items the effect will be additive and will result in a larger gutter than
  what you specify in this prop.

  \`items\`: An array of items to display that contains the information that \`comp\` needs to render.

  \`loadItems\`: A callback when the user scrolls and you need to load more items into the grid.

  \`minCols\`: Adjust this if your layout requires something else.

  \`scrollContainer\`: The default for this is 'window'. If you need to scroll within a smaller container, you can
  pass an \`HTMLElement\` into this prop and the scroll will attach to it instead.
`
);


card('Fixed number of columns',
  md`If you put the grid in a parent with a fixed width, the number of columns
  shown will not change as the page resizes. There is no need to supply a \`minCols\`
  in this case because it will be superseded by the parent width.
  \`\`\`jsx
  <div style={{ width: 600 }}>
    <ClassicGrid
      comp={Item}
      columnWidth={195}
      gutterWidth={5}
      items={this.state.pins}
    />
  </div>
  \`\`\`
  `,
  <div className="dark-gray" style={{ width: 600 }}>
    <CollageGrid />
  </div>
);

card('Fluid number of columns',
  md`The number of columns in this grid changes responsively based on the width of the parent.
  \`\`\`jsx
    <ClassicGrid
      comp={Item}
      items={this.state.pins}
      loadItems={this.loadItems}
      minCols={1}
    />
  \`\`\`
  `);


card('Example of fluid number of columns',
  <div className="dark-gray">
    <ExampleGrid />
  </div>,
  {},
  { stretch: true },
);
