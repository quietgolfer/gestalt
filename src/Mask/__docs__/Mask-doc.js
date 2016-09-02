import React from 'react';
import Mask from '../Mask';
import { card, md, ns } from 'corkboard';
import { dangerous } from '../../../.corkboard/dangerous';

ns('Mask');
dangerous('Mask');

card('Mask',
  md`# Mask
  If you have stuff you need to fit into a shape, put a \`Mask\` on it.`,
  <div />, {},
  { heading: false });

card('Mask options',
  md`
  \`\`\`html
  <Mask height={80} type="circle" width={80}></Mask>
  <Mask height={80} type="rounded" width={80}></Mask>
  \`\`\`


  `,
  <div className="flex">
    <div className="p1">
      <h5 className="center">{'Circle'}</h5>
      <Mask height={80} type="circle" width={80}>
        <div style={{ backgroundColor: '#0084ff', width: 80, height: 80 }} />
      </Mask>
    </div>

    <div className="p1">
      <h5 className="center">{'Rounded'}</h5>
      <Mask height={80} type="rounded" width={80}>
        <div style={{ backgroundColor: '#0084ff', width: 80, height: 80 }} />
      </Mask>
    </div>

  </div>);
