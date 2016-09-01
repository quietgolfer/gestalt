import React from 'react';
import CollageGrid from './CollageGrid';
import ExampleGrid from './ExampleGrid';
import { card, md, ns } from 'corkboard';

ns('Grid');

card('Grid',
  md`# Grid
  `, <div />, {}, { heading: false });


card('Fixed width',
  md`With a set number of items, used as a collage component.`,
  <div style={{ width: 400 }}>
    <CollageGrid />
  </div>
);

card('Fluid width',
  md`The Pinterest grid.`,
  <ExampleGrid />
);
