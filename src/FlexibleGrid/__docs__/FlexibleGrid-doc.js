import React from 'react';
import CollageGrid from './CollageGrid';
import ExampleGrid from './ExampleGrid';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('FlexibleGrid');

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
