// @flow
import React from 'react';
import { card, md } from 'corkboard';
import SelectList from '../SelectList';
import { ns } from '../../../.corkboard/cards';

ns('SelectList');

card('FlowTypes',
md`
\`\`\`jsx
type OptionType = {
  key: string,
  value: string,
};

type Props = {
  id: string,
  onChange: (value: string) => void,
  options?: Array<OptionType>,
  selectedKey: string,
};
\`\`\`
`);

const options = [
  {
    key: 'aus',
    value: 'Australia',
  },
  {
    key: 'bel',
    value: 'Belgium',
  },
  {
    key: 'can',
    value: 'Canada',
  },
  {
    key: 'usa',
    value: 'United States of America',
  },
];

card('Example',
md`
Use a \`SelectList\` when you have four or more items you want
a user to choose from.
\`\`\`jsx
<SelectList
  id="country"
  onChange={(value) => this.setState({selectedKey: value})}
  options={options}
  selectedKey={'usa'}
/>
\`\`\`
`,
(atom) => {
  const state = atom.deref();
  return (
    <SelectList
      id="country"
      options={options}
      selectedKey={'usa'}
      {...state}
      onChange={key => atom.set(props => ({
        ...props,
        selectedKey: key,
      }))}
    />
  );
});
