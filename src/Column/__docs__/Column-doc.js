// @flow
import React, { PropTypes } from 'react';
import { card, md } from 'corkboard';
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
      <div className={'border p1 border-box'}>{children || `Col ${label}`}</div>
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
<div>
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
</div>

<div>
  <Column xs={8} />
  <Column xs={4} />
</div>

<div>
  <Column xs={4} />
  <Column xs={4} />
  <Column xs={4} />
</div>

<div>
  <Column xs={6} />
  <Column xs={6} />
</div>
\`\`\`
`,
  <div>
    <div className="mb2">
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
    </div>

    <div className="mb2">
      <Column xs={8} />
      <Column xs={4} />
    </div>

    <div className="mb2">
      <Column xs={4} />
      <Column xs={4} />
      <Column xs={4} />
    </div>

    <div>
      <Column xs={6} />
      <Column xs={6} />
    </div>
  </div>);

card(
  'Responsive columns',
  md`
  Column supports setting a span at our 4 responsive breakpoints: xs, sm, md, lg. Each sets the span of the column from that breakpoint and up. If you don't want your column to be responsive, only set the \`xs\` prop.

  \`\`\`html
  <div>
    <Column xs={12} md={8} />
    <Column xs={6} md={4} />
  </div>

  <div>
    <Column xs={12} md={4} />
    <Column xs={12} md={4} />
    <Column xs={12} md={4} />
  </div>

  <div>
    <Column xs={6} />
    <Column xs={6} />
  </div>
  \`\`\`
  `,
  <div>
    <div className="mb2">
      <Column xs={12} md={8} />
      <Column xs={6} md={4} />
    </div>

    <div className="mb2">
      <Column xs={12} md={4} />
      <Column xs={12} md={4} />
      <Column xs={12} md={4} />
    </div>

    <div className="mb2">
      <Column xs={6} />
      <Column xs={6} />
    </div>
  </div>);

card(
    'Gutters',
    md`
Column gutters can be created through composition and negative margins.

\`\`\`javascript
<div className="mxn2">
  <Col xs={6}>
    <div className="p2 border-box">
      Col A
    </div>
  </Col>
  <Col xs={6}>
    <div className="p2 border-box">
      Col B
    </div>
  </Col>
</div>
\`\`\`
    `,
  <div className="py2" style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }}>
    <div className="mxn2" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
      <Col xs={6}>
        <div className="p2 border-box">
          <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
              Col A
          </div>
        </div>
      </Col>
      <Col xs={6}>
        <div className="p2 border-box">
          <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
              Col B
          </div>
        </div>
      </Col>
    </div>
  </div>);
