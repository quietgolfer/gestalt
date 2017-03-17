// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Heading from '../Heading';
import { ns } from '../../../.corkboard/cards';

ns('Heading');

card('FlowType',
md`
\`\`\`jsx
type Props = {
  accessibilityLevel?: 1 | 2 | 3 | 4 | 5 | 6,
  children?: any,
  color?: 'blue' | 'darkGray' | 'gray' | 'red' | 'white', /* default: darkGray */
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  truncate?: bool, /* default: false */
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
<Heading color="red">
  {'Red'}
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
    <Heading color="red" size="md">{'Red'}</Heading>
  </div>);

card('Overflow',
  md`
\`\`\`jsx
<Heading>White</Heading>
<Heading>WordWrap</Heading>
<Heading truncate>WordWrap</Heading>
\`\`\`
`,
  <div style={{ width: '16em' }}>
    <Heading size="xs">
      This is a long and Supercalifragilisticexpialidocious
      sentence. 次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
    <br />
    <Heading size="xs">
      This is a long and Supercalifragilisticexpialidocious
      sentence. 次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
    <br />
    <Heading size="xs" truncate>
      This is a long and Supercalifragilisticexpialidocious
      sentence. 次の単語グレートブリテンおよび北アイルランド連合王国で本当に大きな言葉
    </Heading>
  </div>);

card('Levels',
  md`
For accessibility purposes, we allow you to override the heading level.

We should have one level 1 per page & levels should be appropriately nested. E.g. level 1 followed by level 2 & level 2 followed by level 2 or level 3.
\`\`\`html
<Heading size="sm" accessibilityLevel={2}>
  {'Small heading level 2'}
</Heading>
<Heading size="xs" accessibilityLevel={3}>
  {'Extra small heading level 3'}
</Heading>
\`\`\`
`,
  <div>
    <Heading size="sm" accessibilityLevel={2}>
      {'Small heading level 2'}
    </Heading>
    <Heading size="xs" accessibilityLevel={3}>
      {'Extra small heading level 3'}
    </Heading>
  </div>);
