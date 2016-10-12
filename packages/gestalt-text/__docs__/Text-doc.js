// @flow

import React from 'react';
import { card, md } from 'corkboard';
import Text from '../Text';
import { ns } from '../../../.corkboard/cards';

ns('Text');

const maxWidthStyle = {
  maxWidth: '400px',
};

card('PropTypes',
md`
\`\`\`jsx
Text.propTypes = {
  align: PropTypes.oneOf(['left', 'right', 'center', 'justify']), /* default: left */
  bold: PropTypes.bool, /* default: false */
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['gray', 'dark-gray']), /* default: dark-gray */
  inline: PropTypes.bool, /* default: false */
  italic: PropTypes.bool, /* default: false */
  overflow: PropTypes.oneOf(['break-word', 'normal']), /* default: normal */
  size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']), /* default: m */
  truncate: PropTypes.bool, /* default: false */
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
<Text color="gray">
  Gray
</Text>
<Text color="dark-gray">
  Dark Gray (default)
</Text>
\`\`\`
`,
  <div>
    <div className="mb2">
      <Text color="gray">Gray</Text>
    </div>
    <div className="mb2">
      <Text color="dark-gray">Dark Gray (default)</Text>
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
<Text size="s">
  {'Small'}
</Text>
<Text size="m">
  {'Medium (default)'}
</Text>
<Text size="l">
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
      <Text inline size="s">{'Small'}</Text>
      {' '}
      <span lang="ja">
        <Text inline size="s">{'こんにちは'}</Text>
      </span>
    </div>
    <div className="mb2">
      <Text inline size="m">{'Medium (default size)'}</Text>
      {' '}
      <span lang="ja">
        <Text inline size="m">{'こんにちは'}</Text>
      </span>
    </div>
    <div className="mb2">
      <Text inline size="l">{'Large'}</Text>
      {' '}
      <span lang="ja">
        <Text inline size="l">{'こんにちは'}</Text>
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
