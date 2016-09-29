import { card } from 'corkboard';
import React from 'react';
import styles from '../Cursor.css';
import { ns, stylesTable } from '../../../.corkboard/cards';

ns(
  'Cursor',
  `
Collection of different cursor options to help users interface
with your design. These don't affect touch input devices.
`);

card(
  'Types',
  <div className="flex col-12 text-center">
    <div className={`col-4 mx2 p2 border ${styles.pointer}`}>
      <code>.pointer</code>
    </div>
    <div className={`col-4 mx2 p2 border ${styles['zoom-in']}`}>
      <code>.zoom-in</code>
    </div>
    <div className={`col-4 mx2 p2 border ${styles['zoom-out']}`}>
      <code>.zoom-out</code>
    </div>
  </div>,
  { heading: false }
);

stylesTable(require('!!raw!postcss!../Cursor.css'));
