import React from 'react';
import Switch from '../Switch';
import Text from '../../Text/Text';
import { card, md, ns } from 'corkboard';
import { dangerous } from '../../../.corkboard/dangerous';

ns('Switch');
dangerous('Switch');

card('Switch',
  md`# Switch

Use the \`Switch\` component as an on/off control.
`, <div />, {}, { heading: false });

card('PropTypes',
  md`
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
  </div>);

card('Example',
  md`
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
  ));
