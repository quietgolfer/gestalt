// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Heading from '../Heading';
import { ns } from '../../../.corkboard/cards';

ns('Heading',
'');

card('PropTypes',
md`
\`\`\`jsx
Heading.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['white', 'gray', 'dark-gray', 'blue']), /* default: dark-gray */
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']).isRequired,
  truncate: PropTypes.bool, /* default: false */
};
\`\`\`
`
);

card('Sizes',
  md`
Comes in a variety of sizes:
\`\`\`html
<Heading size="xs">
  {'Heading extra small'}
</Heading>
<Heading size="sm">
  {'Heading small'}
</Heading>
<Heading size="md">
  {'Heading medium'}
</Heading>
<Heading size="lg">
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
    <span lang="ja">
      <Heading size="xs">{'こんにちは'}</Heading>
    </span>
    <Heading size="sm">{'Heading small'}</Heading>
    {' '}
    <span lang="ja">
      <Heading size="sm">{'こんにちは'}</Heading>
    </span>
    <a><Heading size="md">{'Heading medium'}</Heading></a>
    {' '}
    <span lang="ja">
      <Heading size="md">{'こんにちは'}</Heading>
    </span>
    <Heading size="lg">{'Heading large'}</Heading>
    {' '}
    <span lang="ja">
      <Heading size="lg">{'こんにちは'}</Heading>
    </span>
    <Heading size="xl">{'Heading extra large'}</Heading>
    {' '}
    <span lang="ja">
      <Heading size="xl">{'こんにちは'}</Heading>
    </span>
  </div>);

card('Colors',
  md`
And a variety of colors:
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
      <Heading color="white" size="md">{'White'}</Heading>
    </div>
    <Heading size="md">{'Dark gray (default)'}</Heading>
    <Heading color="gray" size="md">{'Gray'}</Heading>
    <Heading color="blue" size="md">{'Blue'}</Heading>
  </div>);
