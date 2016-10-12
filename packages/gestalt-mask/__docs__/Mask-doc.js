import React from 'react';
import { card, md } from 'corkboard';
import Mask from '../Mask';
import { ns } from '../../../.corkboard/cards';

ns(
  'Mask',
  `If you have an item you need to fit into a shape, you can achieve this by
  putting a \`Mask\` on it.
  `);

card('PropTypes',
  md`
\`\`\`js
Mask.propTypes = {
  children: PropTypes.node,
  height: PropTypes.number,
  type: PropTypes.oneOf(['circle', 'rounded', 'square']),
  width: PropTypes.number,
};
\`\`\`
  `);

card('Shapes',
  md`
There are 3 different shapes that you can achieve using a Mask. The default shape is \`Square\`.
\`\`\`js
<Mask height={70} shape="circle" width={70}>
  <div style={{ backgroundColor: '#0084ff', width: 70, height: 70 }} />
</Mask>
\`\`\`
\`\`\`js
<Mask height={70} shape="rounded" width={70}>
  <div style={{ backgroundColor: '#fbb6ac', width: 70, height: 70 }} />
</Mask>
\`\`\`
\`\`\`js
<Mask height={70} width={70}>
  <div style={{ backgroundColor: '#fab904', width: 70, height: 70 }} />
</Mask>
\`\`\`
  `,
  <div>
    <div className="p2">
      <Mask height={70} shape="circle" width={70}>
        <div style={{ backgroundColor: '#0084ff', width: 70, height: 70 }} />
      </Mask>
    </div>

    <div className="p2">
      <Mask height={70} shape="rounded" width={70}>
        <div style={{ backgroundColor: '#fbb6ac', width: 70, height: 70 }} />
      </Mask>
    </div>

    <div className="p2">
      <Mask height={70} width={70}>
        <div style={{ backgroundColor: '#fab904', width: 70, height: 70 }} />
      </Mask>
    </div>

  </div>);
