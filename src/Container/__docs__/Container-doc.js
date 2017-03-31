// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Box from '../../Box/Box';
import Container from '../Container';
import { ns } from '../../../.corkboard/cards';

ns('Container');

card('FlowTypes',
md`
\`\`\`javascript
type Props = {
  children?: any,
}
\`\`\`
`);

card(
'Responsive content',
md`
Containers are useful in responsively laying out content on different screens. On small screens,
the container is the width of the screen. On large screens, it centers the content.

\`\`\`html
<Box color="gray" padding={2}>
  <Container>
    <Box color="white" padding={2}>
      Centered content
    </Box>
  </Container>
</Box>
\`\`\`
`,
  <Box color="gray" padding={2}>
    <Container>
      <Box color="white" padding={2}>
        Centered content
      </Box>
    </Container>
  </Box>,
{ stacked: true });
