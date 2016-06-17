import React from 'react';
import Mask from '../Mask';
import { card, doc, ns } from 'devcards';

ns('Mask');

card('Mask',
    doc`# Mask

If you have stuff you need to fit into a shape, put a \`Mask\` on it.`,
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

  </div>,
  {},
  { heading: false });
