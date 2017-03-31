// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Box from '../../Box/Box';
import Label from '../../Label/Label';
import Switch from '../Switch';
import Text from '../../Text/Text';
import { ns } from '../../../.corkboard/cards';

ns(
  'Switch',
  'Use the `Switch` component as an on/off control.'
);

card('FlowTypes',
  md`
\`\`\`js
type Props = {
  id: string,
  name?: string,
  onChange: (value: boolean) => void,
  switched?: boolean, /* default: false */
}
\`\`\`
`,
  atom => (
    <Box xs={{ display: 'flex' }} margin={{ left: -1, right: -1 }}>
      <Box padding={1}>
        <Switch
          onChange={() => atom.reset()}
          id="ex1"
        />
      </Box>
      <Box padding={1}>
        <Switch
          onChange={() => atom.reset()}
          id="ex1"
          switched
        />
      </Box>
    </Box>
  ));

card('Example',
  md`
Whenever you are using a \`Switch\` component, you should use a [Label](#/Label) with it to make
your component accessible.
\`\`\`html
<Label htmlFor="switchExample">
  <Text>Live example</Text>
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
