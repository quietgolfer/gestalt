import React from 'react';
import SearchField from '../SearchField';
import { card, doc, ns } from 'corkboard';

ns('SearchField');

card('SearchField',
  doc`Used anywhere we offer search or some type-ahead like functionality.`,
  <SearchField readOnly value="Foo" />);
