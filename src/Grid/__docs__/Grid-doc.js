import React from 'react';
import ExampleGrid from './ExampleGrid';
import { card, md, ns } from 'corkboard';

ns('Grid');

card('Grid', md`# Grid`, <div />, {}, { heading: false });


card('Fixed width',
  md`The Pinterest grid.`,
  <ExampleGrid />
);
