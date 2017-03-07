// @flow

import React from 'react';
import { card, md } from 'corkboard';
import Heading from '../../Heading/Heading';
import Label from '../../Label/Label';
import Text from '../../Text/Text';
import RadioButton from '../RadioButton';
import { ns } from '../../../.corkboard/cards';

ns('RadioButton');

card('PropTypes',
md`
\`\`\`jsx
type props: {
  checked?: boolean,
  id: string,
  name?: string, // the name given for all radio buttons in a single group
  onChange: (e: { +checked: boolean }) => void,
  value: string,
};
\`\`\`
`);

card('Proper Usage',
md`
Note that this component is only the styled radio button itself. Therefore, you must
provide accessible labels in order to make your radio buttons usable. Please use
\`padding\` rather than \`margin\` around your labels in order to make the clickable
area larger.

\`\`\`jsx
<RadioButton
  checked={this.state.checked === 'usa'}
  id="usa"
  onChange={() => this.setState({ checked: 'usa'})}
  value="usa"
/>
<Label htmlFor="usa">
  <div className="px2">
    <Text bold>Male</Text>
  </div>
</Label>
\`\`\`
`,
  <div>
    <div className="px2 flex items-center">
      <RadioButton
        checked
        id="usa"
        onChange={() => undefined}
        value="usa"
      />
      <Label htmlFor="usa">
        <div className="px2">
          <Text bold>U.S.A.</Text>
        </div>
      </Label>
    </div>
  </div>
);

card('Radio Button Group',
md`
Here is an example of an accessible list of radio buttons.

\`\`\`html
<fieldset className="no-border p0">
  <div className="py1">
    <legend>
      <Heading size="xs">Gender</Heading>
    </legend>
  </div>
  <ul className="p0" style={{ listStyle: 'none' }}>
    <li className="flex py1 items-center" key={0}>
      <RadioButton
        checked={this.state.checked === 'male'}
        id="male"
        name="genderOptions"
        onChange={() => this.setState({ checked: 'male'})}
        value="male"
      />
      <Label htmlFor="male">
        <div className="px2">
          <Text bold>Male</Text>
        </div>
      </Label>
    </li>
    <li className="flex py1 items-center" key={1}>
      <RadioButton
        checked={this.state.checked === 'female'}
        id="female"
        name="genderOptions"
        onChange={() => this.setState({ checked: 'female'})}
        value="female"
      />
      <Label htmlFor="female">
        <div className="px2">
          <Text bold>Female</Text>
        </div>
      </Label>
    </li>
  </ul>
</fieldset>
\`\`\`

`,
(atom) => {
  if (!atom.deref().checked) { atom.reset({ checked: 'female' }); }
  return (
    <div className="flex flex-column">
      <fieldset className="no-border p0">
        <div className="py1">
          <legend>
            <Heading size="xs">Gender</Heading>
          </legend>
        </div>
        <ul className="p0" style={{ listStyle: 'none' }}>
          <li className="flex py1 items-center" key={0}>
            <RadioButton
              checked={atom.deref().checked === 'male'}
              id="male"
              name="genderOptions"
              onChange={() => atom.reset({ checked: 'male' })}
              value="male"
            />
            <Label htmlFor="male">
              <div className="px2">
                <Text bold>Male</Text>
              </div>
            </Label>
          </li>
          <li className="flex py1 items-center" key={1}>
            <RadioButton
              checked={atom.deref().checked === 'female'}
              id="female"
              name="genderOptions"
              onChange={() => atom.reset({ checked: 'female' })}
              value="female"
            />
            <Label htmlFor="female">
              <div className="px2">
                <Text bold>Female</Text>
              </div>
            </Label>
          </li>
        </ul>
      </fieldset>
    </div>
  );
});
