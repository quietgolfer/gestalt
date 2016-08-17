import React from 'react';
import Text from '../Text';
import { card, doc, ns } from 'devcards';

ns('Text');

card('Text',
  doc`Supported sizes:`,
  <div>
    <p>
      <Text inline size="xs">{'Text extra small'}</Text>
      {' '}
      <Text inline size="xs">{'こんにちは'}</Text>
    </p>
    <p>
      <Text inline size="s">{'Text small'}</Text>
      {' '}
      <Text inline size="s">{'こんにちは'}</Text>
    </p>
    <p>
      <Text inline size="m">{'Text medium'}</Text>
      {' '}
      <Text inline size="m">{'こんにちは'}</Text>
    </p>
    <p>
      <Text inline size="l">{'Text large'}</Text>
      {' '}
      <Text inline size="l">{'こんにちは'}</Text>
    </p>
    <p>
      <Text inline size="xl">{'Text extra large'}</Text>
      {' '}
      <Text inline size="xl">{'こんにちは'}</Text>
    </p>
  </div>);

card('Block Layout',
  doc`By default text uses block elements.`,
  <div>
    <Text>{'Here is some content in the default block element.'}</Text>
    <Text inline>{'Inline text with the `inline` prop. '}</Text>
    <Text inline>{'More inline text.'}</Text>
  </div>,
  {},
  { heading: false });
