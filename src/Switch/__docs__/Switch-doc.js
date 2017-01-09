// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Switch from '../Switch';
import { ns } from '../../../.corkboard/cards';

ns(
  'Switch',
  'Use the `Switch` component as an on/off control.'
);

card('FlowType',
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
      <div>
        <label htmlFor="switchExample">Live example</label>
      </div>
      <Switch
        onChange={() => atom.reset({ switched: !atom.deref().switched })}
        id="switchExample"
        switched={atom.deref().switched}
      />
    </div>
  ));
