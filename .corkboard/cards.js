import React from 'react';
import { card, registerCard, ns as registerNamespace } from 'corkboard';
import Box from '../src/Box/Box';
import Heading from '../src/Heading/Heading';
import cs from 'classnames';
import Markdown from 'corkboard/lib/components/Markdown';
import postcss from 'postcss';
import safeParser from 'postcss-safe-parser';

export function ns(name, text = '') {
  registerNamespace(name);
  registerCard(
    <div>
      <Box margin={{ bottom: 6}}>
        <Heading size="lg">
          {name}
        </Heading>
      </Box>
      <Box xs={{ column: 8 }}>
        <Markdown text={text} />
      </Box>
    </div>
  );
}
