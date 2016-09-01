import React from 'react';
import TextField from '../TextField';
import { card, md, ns } from 'corkboard';

ns('TextField');

card('TextField',
  md`Lorem ipsum dolor sit amet.`,
  <TextField readOnly value="Foo" />);
