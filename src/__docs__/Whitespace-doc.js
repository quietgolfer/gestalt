// @flow

import React from 'react';
import { card, md } from 'corkboard';
import { ns, stylesTable } from '../../.corkboard/cards';

ns('Whitespace',
  `
Gestalt uses a simple short-hand way to apply *responsive* margin and padding to elements.
Margin and padding classnames take the form of \`{m, p}{x, y, t, b, l, r}{n}{0-6}\`.

The numbers (0-6) represent responsiveness according to "boints", which are screen-independent
number of points. As the size of a screen changes, the number of pixels corresponding
to that boint value also changes.

Each of those values is explained below:

| Character | Description                                 |
| ---       | ---                                         |
| m         | margin                                      |
| p         | padding                                     |
| x         | Apply x-direction (left and right)          |
| y         | Apply y-direction (top and bottom)          |
| t         | Apply property to the top                   |
| b         | Apply property to the bottom                |
| l         | Apply property to the left                  |
| r         | Apply property to the right                 |
| n         | Apply negative value of property            |
| 0         | Set margin or padding to 0                  |
| 1-6       | Set responsive margin or padding from 1 boint to 6 boints |

Thus, if you want to apply a 2 boint margin to the top, you would apply the class
\`mt2\` to your element.

If you want to apply padding only in the left and right directions, then you would add
\`px{1, 2, 3, 4}\` to your element.

If you want to completely get rid of all padding and margin, then you would add
\`m0 p0\` to your element. More examples below.
`
);

card('Combining margin and padding',
  md`
Some examples of combining margin and padding are found below. Try resizing the
browser to see the respsoniveness take place.

\`\`\`html
<div class="mb1 p3"> margin-bottom: 1bt, padding: 3bts </div>
<div class="m2 pl4"> margin: 2bt, padding-left: 4bts </div>
<div class="mt2 pb2"> margin-top: 2bt, padding-bottom: 2bt </div>
\`\`\`
`,
  <div className="container">
    <div className={'mb1 p3 border'}> {'margin-bottom: 1bt, padding: 3bts'} </div>
    <div className={'m2 pl4 border'}> {'margin: 2bt, padding-left: 4bts'} </div>
    <div className={'mt2 pb2 border'}> {'margin-top: 2bt, padding-bottom: 2bt'} </div>
  </div>
);

card('Excluded margin values',
  md`
You may notice that there are no classnames for \`mx{1-6}\`, or \`my{1-6}\`. This is
because symmetrical whitespace is best applied as padding, as margins collapse.

So, if you need to apply symmetrical padding, use the corresponding \`px{1-6}\` and \`py{1-6}\`
classnames.`
);

card('Styles Table', stylesTable(require('!!raw!postcss!../Whitespace.css')));
