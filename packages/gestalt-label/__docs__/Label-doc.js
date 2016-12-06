// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Label from '../Label';
import Switch from '../../gestalt-switch/Switch';
import Text from '../../gestalt-text/Text';
import { ns } from '../../../.corkboard/cards';

ns('Label',
'Use the Label component to make your features more accessible!');

card('FlowType',
md`
\`\`\`js
type Props = {
  children?: any,
  htmlFor: string,
};
\`\`\`
`);

card('Example',
md`
Whenever you are using a [Switch](#/Switch) component, you should use a \`Label\` with it.
To control the toggle, you can click on the Switch itself or the label 'Live example' above it.
\`\`\`html
<Label htmlFor="switchExample">
  <Text size="sm">Live example</Text>
</Label>
<Switch
  onChange={() => atom.reset({ switched: !atom.deref().switched })}
  id="switchExample"
  switched={atom.deref().switched}
/>
\`\`\`
  `,
  atom => (
    <div>
      <Label htmlFor="switchExample">
        <Text size="sm">Live example</Text>
      </Label>
      <Switch
        onChange={() => atom.reset({ switched: !atom.deref().switched })}
        id="switchExample"
        switched={atom.deref().switched}
      />
    </div>
  ));
