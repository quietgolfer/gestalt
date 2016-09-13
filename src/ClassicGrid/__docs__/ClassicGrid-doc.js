import React from 'react';
import CollageGrid from './CollageGrid';
import ExampleGrid from './ExampleGrid';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('ClassicGrid');

card('Fixed width',
  md`With a set number of items, used as a collage component.`,
  <div style={{ width: 400 }}>
    <CollageGrid />
  </div>
);

card(
  'Fluid width',
  md`The Pinterest grid.`,
  <ExampleGrid />,
  {},
  { stretch: true },
);
