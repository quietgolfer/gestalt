// @flow
import React, { PropTypes } from 'react';
import { card, md } from 'corkboard';
import Col from '../Column';
import { ns, stylesTable } from '../../../.corkboard/cards';

ns('Column');

card('FlowTypes',
md`
\`\`\`jsx
type Columns = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
  children?: Element<any>,
  span: Columns,
}
\`\`\`
`);

function Column(props: {size: *, children?: any}) {
  const {
    size,
  } = props;

  return (
    <Col span={size}>
      <div className={'border p1 border-box'}>
        {props.children ? props.children : size}
      </div>
    </Col>
  );
}

Column.propTypes = {
  size: PropTypes.number,
};

card(
  'Column system',
  md`
Gestalt supports a 12-column system with which you can build layouts by adding \`.col-{1-12}\`
to your elements.

\`\`\`javascript
Column.propTypes = {
  children: PropTypes.node,
  span: PropTypes.number.isRequired,
};
\`\`\`

\`\`\`html
<div class="flex">
  <Column span={1}>1</Column>
  <Column span={2}>2</Column>
  <Column span={3}>3</Column>
  <Column span={4}>4</Column>
  <Column span={5}>5</Column>
  <Column span={6}>6</Column>
  <Column span={7}>7</Column>
  <Column span={8}>8</Column>
  <Column span={9}>9</Column>
  <Column span={10}>10</Column>
  <Column span={11}>11</Column>
  <Column span={12}>12</Column>
</div>
<div class="flex">
  <Column span={8}>8</Column>
  <Column span={4}>4</Column>
</div>
<div class="flex">
  <Column span={4}>4</Column>
  <Column span={4}>4</Column>
  <Column span={4}>4</Column>
</div>
<div class="flex">
  <Column span={6}>6</Column>
  <Column span={6}>6</Column>
</div>
\`\`\`
`,
  <div>
    <div className="flex mb2">
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
      <Column size={1} />
    </div>

    <div className="flex mb2">
      <Column size={8} />
      <Column size={4} />
    </div>

    <div className="flex mb2">
      <Column size={4} />
      <Column size={4} />
      <Column size={4} />
    </div>

    <div className="flex">
      <Column size={6} />
      <Column size={6} />
    </div>
  </div>);

card('Styles Table',
  <p className="red">These styles are deprecated. Please use the <code>Column</code> component instead.</p>,
  stylesTable(require('!!raw!postcss!../Column.css')),
  { stacked: true });
