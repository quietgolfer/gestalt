// @flow
import { card, doc, ns } from 'devcards';

ns('Layout');

card('Layout',
  doc`Most classes needed to layout elements correspond to their CSS properties/values pretty
  tightly. For example:

  \`.pull-left\` and \`.pull-right\` correspond to \`float: left\` and \`float: right\`.

  For a full list of classes and the properties they correspond to:

  | Class name        | Property: value                             |
  | ---               | ---                                         |
  | .block            | \`display: block\`                          |
  | .inline           | \`display: inline\`                         |
  | .inline-block     | \`display: inline-block \`                  |
  | .table            | \`display: table \`                         |
  | .table-cell       | \`display: table-cell \`                    |
  | .overflow-hidden  | \`overflow: hidden \`                       |
  | .overflow-scroll  | \`overflow: scroll \`                       |
  | .overflow-auto    | \`overflow: auto \`                         |
  | .fit              | \`max-width: 100% \`                        |
  | .relative         | \`position: relative \`                     |
  | .absolute         | \`position: absolute \`                     |
  | .fixed            | \`position: fixed \`                        |

  `);

card('Positioning',
  doc`Gestalt provides helper classes for resetting top, bottom, left, and right positioning.
  The respective classnames are: \`.top-0\`, \`.bottom-0\`, \`.left-0\`, \`.right-0\`
  `);

// TODO(allenk): Add flexbox properties, along with some code examples
card('Flexbox',
  doc`In order to use flexbox, add the \`.flex\` class to a parent container, then you can apply the
  following classnames to the children elements.
  `);
