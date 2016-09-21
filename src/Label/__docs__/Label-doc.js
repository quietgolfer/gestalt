// @flow
import React from 'react';
import Label from '../Label';
import Switch from '../../Switch/Switch';
import Text from '../../Text/Text';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns('Label');

card('PropTypes',
md`Use the \`Label\` component to make your features more accessible!
\`\`\`js
Label.propTypes = {
  children: PropTypes.node.isRequired,
  htmlFor: PropTypes.string.isRequired,
};
\`\`\`
`);

card('Example',
md`
Whenever you are using a [Switch](#/Switch) component, you should use a \`Label\` with it.
To control the toggle, you can click on the Switch itself or the label 'Live example' above it.
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
