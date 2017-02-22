// @flow
import React from 'react';
import { card, md } from 'corkboard';
import SelectList from '../SelectList';
import { ns } from '../../../.corkboard/cards';

ns('SelectList');

card('FlowTypes',
md`
\`\`\`jsx
type Props = {
  id: string,
  name?: string,
  onChange: (e: { +value: string }) => void,
  options: Array<{
    label: string,
    value: string,
  }>,
  value?: ?string,
};
\`\`\`
`);

const options = [
  {
    value: 'aus',
    label: 'Australia',
  },
  {
    value: 'bel',
    label: 'Belgium',
  },
  {
    value: 'can',
    label: 'Canada',
  },
  {
    value: 'usa',
    label: 'United States of America',
  },
];

card('Example',
md`
Use a \`SelectList\` when you have four or more items you want
a user to choose from.
\`\`\`jsx
<SelectList
  id="country"
  name="country"
  onChange={({ value }) => this.setState({ value })}
  options={options}
  value={this.state.value}
/>
\`\`\`
`,
atom => (
  <div>
    <label htmlFor="country">Country:</label>
    <SelectList
      id="country"
      name="country"
      onChange={({ value }) => atom.reset({ value })}
      options={options}
      value={atom.deref().value}
    />
  </div>
));
