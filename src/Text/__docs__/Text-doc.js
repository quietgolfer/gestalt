import React from 'react';
import Text from '../Text';
import { card, doc, ns } from 'devcards';

ns('Text');

card('Text',
  doc`Pretty standard, really.`,
  <div>
    <p>
      <Text size="xs">{'Text extra small'}</Text>
      {' '}
      <Text size="xs">{'こんにちは'}</Text>
    </p>
    <p>
      <Text size="s">{'Text small'}</Text>
      {' '}
      <Text size="s">{'こんにちは'}</Text>
    </p>
    <p>
      <Text size="m">{'Text medium'}</Text>
      {' '}
      <Text size="m">{'こんにちは'}</Text>
    </p>
    <p>
      <Text size="l">{'Text large'}</Text>
      {' '}
      <Text size="l">{'こんにちは'}</Text>
    </p>
    <p>
      <Text size="xl">{'Text extra large'}</Text>
      {' '}
      <Text size="xl">{'こんにちは'}</Text>
    </p>
  </div>);
