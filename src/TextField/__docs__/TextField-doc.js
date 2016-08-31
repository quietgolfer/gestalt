import React from 'react';
import TextField from '../TextField';
import { card, doc, ns } from 'devcards';

ns('TextField');

card('TextField',
  doc`Lorem ipsum dolor sit amet.`,
  <TextField readOnly value="Foo" />);
