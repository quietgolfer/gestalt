// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Box from '../../Box/Box';
import Switch from '../../Switch/Switch';
import Text from '../../Text/Text';
import Label from '../Label';
import { ns } from '../../../.corkboard/cards';

ns('Label',
'Use the Label component to make your features more accessible!');

card('FlowTypes',
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
Whenever you are using a [SelectList](#/SelectList), [Switch](#/Switch), [TextField](#/TextField) or [TextArea](#/TextArea) component, you should use a \`Label\` with it.
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
    <Box>
      <Box padding={{ y: 1 }}>
        <Label htmlFor="switchExample">
          <Text>Live example</Text>
        </Label>
      </Box>
      <Switch
        onChange={() => atom.reset({ switched: !atom.deref().switched })}
        id="switchExample"
        switched={atom.deref().switched}
      />
    </Box>
  ));
