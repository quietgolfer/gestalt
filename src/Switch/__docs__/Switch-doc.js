// @flow
import React from 'react';
import Switch from '../Switch';
import Text from '../../Text/Text';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns(
  'Switch',
  'Use the `Switch` component as an on/off control.'
);

card('PropTypes',
  md`
\`\`\`js
Switch.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  switched: PropTypes.bool,
};
\`\`\`
`,
  (atom) => (
    <div className="flex mxn1">
      <div className="p1">
        <Switch
          onChange={() => atom.reset()}
          id="ex1"
        />
      </div>
      <div className="p1">
        <Switch
          onChange={() => atom.reset()}
          id="ex1"
          switched
        />
      </div>
    </div>
  ));

card('Example',
  md`
  \`\`\`html
  <label htmlFor="switchExample">
    <Text size="s">Live example</Text>
  </label>
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
