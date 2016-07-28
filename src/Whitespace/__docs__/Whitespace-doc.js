// @flow

import React from 'react';
import { card, doc, ns } from 'devcards';

ns('Whitespace');

card('Whitespace',
  doc`Gestalt uses a simple short-hand way to apply margin and padding to elements.
  Margin and padding classnames take the form of \`{m, p}{x, y, t, b, l, r}{n}{0-4}\`.

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
  | 1-4       | Set margin or padding to \`num\`* space val |

  Thus, if you want to apply a 2 boint margin to the top, you would apply the class
  \`mt2\` to your element.

  If you want to apply padding only in the left and right directions, then you would add
  \`px{1, 2, 3, 4}\` to your element.

  If you want to completely get rid of all padding and margin, then you would add
  \`m0 p0\` to your element.`,
  <div />);
