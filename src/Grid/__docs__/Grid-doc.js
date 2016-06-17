import React from 'react';
import ExampleGrid from './ExampleGrid';
import { card, doc, ns } from 'devcards';

ns('Grid');

card('Grid',
  doc`# Grid

The Pinterest grid.`,
  <ExampleGrid />,
  {}, { padding: false }
);
