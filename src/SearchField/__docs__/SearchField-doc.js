import React from 'react';
import SearchField from '../SearchField';
import { card, md, ns } from 'corkboard';

ns('SearchField');

card('SearchField',
  md`Used anywhere we offer search or some type-ahead like functionality.`,
  <SearchField readOnly value="Foo" />);
