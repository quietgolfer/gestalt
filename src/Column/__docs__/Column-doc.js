// @flow
import React, { PropTypes } from 'react';
import { card, md } from 'corkboard';
import Box from '../../Box/Box';
import Col from '../Column';
import { ns } from '../../../.corkboard/cards';

ns('Column');

card('FlowTypes',
md`
\`\`\`jsx
type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
  children?: any,
  xs: Columns,
  sm?: Columns,
  md?: Columns,
  lg?: Columns,
}
\`\`\`
`);

function Column(props: *) {
  const { children, xs, sm, md: medium, lg } = props;
  const label = [
    { prefix: 'xs', span: xs },
    { prefix: 'sm', span: sm },
    { prefix: 'md', span: medium },
    { prefix: 'lg', span: lg },
  ].filter(p => p.span).map(p => [p.prefix, p.span].join('=')).join(', ');
  return (
    <Col {...props}>
      <Box padding={1} dangerouslySetInlineStyle={{ __style: { border: '1px solid #eee' } }}>{children || `Col ${label}`}</Box>
    </Col>
  );
}

Column.propTypes = {
  children: PropTypes.node,
  xs: PropTypes.number.isRequired,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

card(
  'Column system',
  md`
Gestalt supports a 12-column system.

\`\`\`javascript
<Box>
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
  <Column xs={1} />
</Box>

<Box>
  <Column xs={8} />
  <Column xs={4} />
</Box>

<Box>
  <Column xs={4} />
  <Column xs={4} />
  <Column xs={4} />
</Box>

<Box>
  <Column xs={6} />
  <Column xs={6} />
</Box>
\`\`\`
`,
  <Box>
    <Box margin={{ bottom: 2 }}>
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
      <Column xs={1} />
    </Box>

    <Box margin={{ bottom: 2 }}>
      <Column xs={8} />
      <Column xs={4} />
    </Box>

    <Box margin={{ bottom: 2 }}>
      <Column xs={4} />
      <Column xs={4} />
      <Column xs={4} />
    </Box>

    <Box margin={{ bottom: 2 }}>
      <Column xs={6} />
      <Column xs={6} />
    </Box>
  </Box>);

card(
  'Responsive columns',
  md`
  Column supports setting a span at our 4 responsive breakpoints: xs, sm, md, lg. Each sets the span of the column from that breakpoint and up. If you don't want your column to be responsive, only set the \`xs\` prop.

  \`\`\`html
  <Box>
    <Column xs={12} md={8} />
    <Column xs={6} md={4} />
  </Box>

  <Box>
    <Column xs={12} md={4} />
    <Column xs={12} md={4} />
    <Column xs={12} md={4} />
  </Box>

  <Box>
    <Column xs={6} />
    <Column xs={6} />
  </Box>
  \`\`\`
  `,
  <div>
    <Box margin={{ bottom: 2 }}>
      <Column xs={12} md={8} />
      <Column xs={6} md={4} />
    </Box>

    <Box margin={{ bottom: 2 }}>
      <Column xs={12} md={4} />
      <Column xs={12} md={4} />
      <Column xs={12} md={4} />
    </Box>

    <Box margin={{ bottom: 2 }}>
      <Column xs={6} />
      <Column xs={6} />
    </Box>
  </div>);

card(
    'Gutters',
    md`
Column gutters can be created through composition and negative margins.

\`\`\`javascript
<Box margin={{ left: -2, right: -2 }}>
  <Col xs={6}>
    <Box padding={2}>
      Col A
    </Box>
  </Col>
  <Col xs={6}>
    <Box padding={2}>
      Col B
    </Box>
  </Col>
</Box>
\`\`\`
    `,
  <Box padding={{ y: 2 }} dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(0, 0, 255, 0.1)' } }}>
    <Box margin={{ left: -2, right: -2 }} dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}>
      <Col xs={6}>
        <Box padding={2}>
          <Box dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}>
              Col A
          </Box>
        </Box>
      </Col>
      <Col xs={6}>
        <Box padding={2}>
          <Box dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(255, 0, 0, 0.1)' } }}>
              Col B
          </Box>
        </Box>
      </Col>
    </Box>
  </Box>);
