import React from 'react';
import Heading from '../Heading';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('Heading',
'');

card('Sizes',
  md`Comes in a variety of sizes:
  \`\`\`html
  <Heading size="xs">
    {'Heading extra small'}
  </Heading>
  <Heading size="s">
    {'Heading small'}
  </Heading>
  <Heading size="m">
    {'Heading medium'}
  </Heading>
  <Heading size="l">
    {'Heading large'}
  </Heading>
  <Heading size="xl">
    {'Heading extra large'}
  </Heading>
  \`\`\`
  `,
  <div>
    <Heading size="xs">{'Heading extra small'}</Heading>
    {' '}
    <Heading locale="ja" size="xs">{'こんにちは'}</Heading>
    <Heading size="s">{'Heading small'}</Heading>
    {' '}
    <Heading locale="ja" size="s">{'こんにちは'}</Heading>
    <Heading size="m">{'Heading medium'}</Heading>
    {' '}
    <Heading locale="ja" size="m">{'こんにちは'}</Heading>
    <Heading size="l">{'Heading large'}</Heading>
    {' '}
    <Heading locale="ja" size="l">{'こんにちは'}</Heading>
    <Heading size="xl">{'Heading extra large'}</Heading>
    {' '}
    <Heading locale="ja" size="xl">{'こんにちは'}</Heading>
  </div>);

card('Colors',
  md`And a variety of colors:
  \`\`\`html
  <Heading color="white">
    {'White'}
  </Heading>
  <Heading>
    {'Dark gray (default)'}
  </Heading>
  <Heading color="gray">
    {'Gray'}
  </Heading>
  <Heading color="blue">
    {'Blue'}
  </Heading>
  \`\`\`
  `,
  <div>
    <div style={{ backgroundColor: '#555' }}>
      <Heading color="white" size="m">{'White'}</Heading>
    </div>
    <Heading size="m">{'Dark gray (default)'}</Heading>
    <Heading color="gray" size="m">{'Gray'}</Heading>
    <Heading color="blue" size="m">{'Blue'}</Heading>
  </div>);
