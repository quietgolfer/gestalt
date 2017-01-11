// @flow

import React from 'react';
import { card, md } from 'corkboard';
import Text from '../Text';
import { ns } from '../../../.corkboard/cards';

ns('Text');

const maxWidthStyle = {
  maxWidth: '400px',
};

card('FlowType',
md`
\`\`\`jsx
type Props = {
  align?: 'left' | 'right' | 'center' | 'justify', /*default: left */
  bold?: bool, /* default: false */
  children?: any,
  color?: 'blue' | 'dark-gray' | 'gray' | 'red' | 'white', /* default: dark-gray */
  inline?: bool, /* default: false */
  italic?: bool, /* default: false */
  overflow?: 'break-word' | 'normal', /* default: normal */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl', /* default: md */
  truncate?: bool, /* default: false */
};
\`\`\`
`
);

card('Alignment',
  md`
You can apply the following to adjust the positioning of text within wrapper elements.

\`\`\`html
<Text align="left">
  Left (default)
</Text>
<Text align="right">
  Right
</Text>
<Text align="center">
  Center
</Text>
<Text align="justify">
  Justify
</Text>
\`\`\`
`,
  <div className="container" style={maxWidthStyle}>
    <Text align="left">Left (default)</Text>
    <Text align="right">Right</Text>
    <Text align="center">Center</Text>
    <Text align="justify">Justify</Text>
  </div>);

card('Block vs inline',
  md`
The Text component allows you to specifiy whether you want \`block\` or \`inline\` text.
\`\`\`html
<Text>
  Some content in a default block element. (default)
</Text>
<Text inline>
  Inline text with the "inline" prop.
</Text>
<Text inline>
  More inline text.
</Text>
\`\`\`
`,
  <div>
    <div className="mb2">
      <Text>Some content in a default block element. (default)</Text>
    </div>
    <div className="mb2">
      <Text inline>Inline text with the &quot;inline&quot; prop.</Text>
      <Text inline>More inline text.</Text>
    </div>
  </div>);

card('Colors',
  md`
You can specify which color you want for your text.

\`\`\`html
<Text color="white">
  White
</Text>
<Text color="gray">
  Gray
</Text>
<Text color="dark-gray">
  Dark Gray (default)
</Text>
<Text color="blue">
  Blue
</Text>
<Text color="red">
  Red
</Text>
\`\`\`
`,
  <div>
    <div className="mb2" style={{ backgroundColor: '#555' }}>
      <Text color="white">White</Text>
    </div>
    <div className="mb2">
      <Text color="gray">Gray</Text>
    </div>
    <div className="mb2">
      <Text color="dark-gray">Dark Gray (default)</Text>
    </div>
    <div className="mb2">
      <Text color="blue">Blue</Text>
    </div>
    <div className="mb2">
      <Text color="red">Red</Text>
    </div>
  </div>);

card('Overflow',
  md`
Gestalt provides utility options to deal with text overflow.

\`\`\`html
<Text>
  Normal
</Text>
<Text overflow="break-word">
  Break-word
</Text>
<Text truncate>
  Trunacte
</Text>
\`\`\`
`,
  <div style={maxWidthStyle}>
    <div className="mb2">
      <Text>
        <strong>normal</strong> - Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
      </Text>
    </div>
    <div className="mb2">
      <Text overflow="break-word">
        <strong>break-word</strong> - Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
      </Text>
    </div>
    <div className="mb2">
      <Text truncate>
        <strong>truncate</strong> - Lorem ipsum dolor sit amet
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
      </Text>
    </div>
  </div>);

card('Sizes',
  md`
You can apply the following \`size\` options to define the size of the text.
\`\`\`html
<Text size="xs">
  {'Extra small'}
</Text>
<Text size="sm">
  {'Small'}
</Text>
<Text size="md">
  {'Medium (default)'}
</Text>
<Text size="lg">
  {'Large'}
</Text>
<Text size="xl">
  {'Extra large'}
</Text>
\`\`\`
`,
  <div>
    <div className="mb2">
      <Text inline size="xs">{'Extra small'}</Text>
      {' '}
      <span lang="ja">
        <Text inline size="xs">{'こんにちは'}</Text>
      </span>
    </div>
    <div className="mb2">
      <Text inline size="sm">{'Small'}</Text>
      {' '}
      <span lang="ja">
        <Text inline size="sm">{'こんにちは'}</Text>
      </span>
    </div>
    <div className="mb2">
      <Text inline size="md">{'Medium (default size)'}</Text>
      {' '}
      <span lang="ja">
        <Text inline size="md">{'こんにちは'}</Text>
      </span>
    </div>
    <div className="mb2">
      <Text inline size="lg">{'Large'}</Text>
      {' '}
      <span lang="ja">
        <Text inline size="lg">{'こんにちは'}</Text>
      </span>
    </div>
    <div className="mb2">
      <Text inline size="xl">{'Extra Large'}</Text>
      {' '}
      <span lang="ja">
        <Text inline size="xl">{'こんにちは'}</Text>
      </span>
    </div>
  </div>);

card('Styles',
  md`
There are multiple styles such as bold, italic and underline that we can
attach to the Text component.

\`\`\`html
<Text bold>Bold</Text>
<Text italic>Italic</Text>
<Text underline>Underline</Text>
\`\`\`
`,
  <div>
    <div className="mb2">
      <Text bold>Bold</Text>
    </div>
    <div className="mb2">
      <Text italic>Italic</Text>
    </div>
    <div className="mb2">
      <Text underline>Underline</Text>
    </div>
  </div>);
