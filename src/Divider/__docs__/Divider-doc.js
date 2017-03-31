// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Box from '../../Box/Box';
import Divider from '../Divider';
import { ns } from '../../../.corkboard/cards';

ns('Divider');

card('Divider usage',
  md`If you have two things that need to be separated, put a \`Divider\` between them.

\`\`\`html
<Box>
  <Box padding={1}>{'Some content'}</Box>
  <Divider />
  <Box padding={1}>{'Other content'}</Box>
</Box>
\`\`\`

`,
  <Box>
    <Box padding={1}>{'Some content'}</Box>
    <Divider />
    <Box padding={1}>{'Other content'}</Box>
  </Box>);
