// @flow
import React from 'react';
import Label from '../../gestalt-label/Label';
import Switch from '../Switch';
import Text from '../../gestalt-text/Text';
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
Whenever you are using a \`Switch\` component, you should use a [Label](#/Label) with it to make
your component accessible.
\`\`\`html
<Label htmlFor="switchExample">
  <Text size="s">Live example</Text>
</Label>
<Switch
  onChange={() => atom.reset({ switched: !atom.deref().switched })}
  id="switchExample"
  switched={atom.deref().switched}
/>
\`\`\`
  `,
  (atom) => (
    <div>
      <Label htmlFor="switchExample">
        <Text size="s">Live example</Text>
      </Label>
      <Switch
        onChange={() => atom.reset({ switched: !atom.deref().switched })}
        id="switchExample"
        switched={atom.deref().switched}
      />
    </div>
  ));
