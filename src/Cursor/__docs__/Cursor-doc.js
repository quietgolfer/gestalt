import { card, md, ns } from 'corkboard';
import React from 'react';
import classnames from 'classnames/bind';
import styles from '../../../styles.css';
import Text from '../../Text/Text';

const cx = classnames.bind(styles);

const inline = {
  height: 50,
};

ns('Cursor');

card('Cursor',
  md`Collection of different cursor options to help users interface with your design

  For a full list of classes and the properties they correspond to:

  | Class name        | Property: value                             |
  | ---               | ---                                         |
  | .pointer          | \`cursor: pointer\`                         |
  | .zoom-in          | \`cursor: zoom-in\`                         |
  | .zoom-out         | \`cursor: zoom-out\`                        |

  See the divs below for a live example.
`,
  <div className={cx('flex', 'col-12')}>
    <div className={cx('col-4', 'border', 'pointer')} style={inline}>
      <Text bold>pointer</Text>
    </div>
    <div className={cx('col-4', 'border', 'zoom-in')} style={inline}>
      <Text bold>zoom-in</Text>
    </div>
    <div className={cx('col-4', 'border', 'zoom-out')} style={inline}>
      <Text bold>zoom-out</Text>
    </div>
  </div>
);
