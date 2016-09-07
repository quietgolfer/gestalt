import React from 'react';
import Text from '../Text';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('Text');

card('Sizes',
  md`
  \`\`\`html
    <Text size="xs">
      {'Text extra small'}
    </Text>
    <Text size="s">
      {'Text small'}
    </Text>
    <Text>
      {'Text medium (default size)'}
    </Text>
    <Text size="l">
      {'Text large'}
    </Text>
    <Text size="xl">
      {'Text extra large'}
    </Text>
  \`\`\`
  `,
  <div>
    <p>
      <Text inline size="xs">{'Text extra small'}</Text>
      {' '}
      <Text inline locale="ja" size="xs">{'こんにちは'}</Text>
    </p>
    <p>
      <Text inline size="s">{'Text small'}</Text>
      {' '}
      <Text inline locale="ja" size="s">{'こんにちは'}</Text>
    </p>
    <p>
      <Text inline size="m">{'Text medium (default size)'}</Text>
      {' '}
      <Text inline locale="ja" size="m">{'こんにちは'}</Text>
    </p>
    <p>
      <Text inline size="l">{'Text large'}</Text>
      {' '}
      <Text inline locale="ja" size="l">{'こんにちは'}</Text>
    </p>
    <p>
      <Text inline size="xl">{'Text extra large'}</Text>
      {' '}
      <Text inline locale="ja" size="xl">{'こんにちは'}</Text>
    </p>
  </div>);

card('Block vs inline layout',
  md`By default text uses block elements.
  \`\`\`html
    <Text>
      {'Some content in a default block element.'}
    </Text>
    <Text inline>
      {'Inline text with the "inline" prop. '}
    </Text>
    <Text inline>
      {'More inline text.'}
    </Text>
  \`\`\`
  `,
  <div>
    <Text>{'Some content in a default block element.'}</Text>
    <Text inline>{'Inline text with the "inline" prop. '}</Text>
    <Text inline>{'More inline text.'}</Text>
  </div>);
