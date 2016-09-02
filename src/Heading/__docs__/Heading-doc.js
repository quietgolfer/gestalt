import React from 'react';
import Divider from '../../Divider/Divider';
import Heading from '../Heading';
import { card, md, ns } from 'corkboard';

ns('Heading');

card('Heading',
  md`# Heading`, <div />, {}, { heading: false });

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
    <Divider />
    <Heading size="xs">{'Heading extra small'}</Heading>
    {' '}
    <Heading locale="ja" size="xs">{'こんにちは'}</Heading>
    <Divider />
    <Heading size="s">{'Heading small'}</Heading>
    {' '}
    <Heading locale="ja" size="s">{'こんにちは'}</Heading>
    <Divider />
    <Heading size="m">{'Heading medium'}</Heading>
    {' '}
    <Heading locale="ja" size="m">{'こんにちは'}</Heading>
    <Divider />
    <Heading size="l">{'Heading large'}</Heading>
    {' '}
    <Heading locale="ja" size="l">{'こんにちは'}</Heading>
    <Divider />
    <Heading size="xl">{'Heading extra large'}</Heading>
    {' '}
    <Heading locale="ja" size="xl">{'こんにちは'}</Heading>
    <Divider />
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
