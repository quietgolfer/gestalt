// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Container from '../Container';
import { ns } from '../../../.corkboard/cards';

ns('Container');

card('PropTypes',
md`
\`\`\`javascript
Container.propTypes = {
  children: PropTypes.node,
};
\`\`\`
`);

card(
'Responsive content',
md`
Containers are useful in responsively laying out content on different screens. On small screens,
the container is the width of the screen. On large screens, it centers the content.

\`\`\`html
<div className="bg-gray">
  <Container>
    <div className="bg-white p2">
      Centered content
    </div>
  </Container>
</div>
\`\`\`
`,
  <div className="bg-gray p2">
    <Container>
      <div className="bg-white p2">
        Centered content
      </div>
    </Container>
  </div>,
{ stacked: true });
