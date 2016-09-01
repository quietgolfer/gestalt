import React from 'react';
import Navbar from '../Navbar';
import { card, md, ns } from 'corkboard';

ns('Navbar');

card('Navbar',
  md`# Navbar

If you have stuff you need to fit into a shape, put a \`Mask\` on it.`,
  <div className="p1 bg-gray">
    <Navbar>
      <div className="flex items-center">
        <div className="p1">{'Pinterest'}</div>
        <div className="p1 flex-auto">
          <input
            className="col-12 bg-silver no-border p1 block rounded"
            style={{ border: 'none' }}
            type="text"
          />
        </div>
        <div className="p1">{'Other stuff'}</div>
      </div>
    </Navbar>
  </div>
  , {}, { heading: false });
