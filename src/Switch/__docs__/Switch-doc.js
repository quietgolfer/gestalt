import React from 'react';
import Switch from '../Switch';
import Text from '../../Text/Text';
import { card, doc, ns } from 'devcards';

ns('Switch');

card('Switch',
  doc`# Switch

Use the \`Switch\` component as an on/off control.

\`\`\`html
Switch.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  switched: PropTypes.bool,
};
\`\`\`

`,

  <div className="flex mxn1">
    <div className="p1">
      <Switch />
    </div>
    <div className="p1">
      <Switch switched />
    </div>
  </div>
  , {}, { heading: false });

card('Switch',
  doc`Live example:

  \`\`\`html
  <Switch
    onChange={() => atom.reset({ switched: !atom.deref().switched })}
    id="switchExample"
    switched={atom.deref().switched}
  />
  \`\`\`
  `,
  (atom) => (
    <div>
      <label htmlFor="switchExample">
        <Text size="s">Live example</Text>
      </label>
      <Switch
        onChange={() => atom.reset({ switched: !atom.deref().switched })}
        id="switchExample"
        switched={atom.deref().switched}
      />
    </div>
  ),
  { switched: false },
  { heading: false });
