// @flow

import React from 'react';
import { card, md } from 'corkboard';
import SelectList from '../../gestalt-select-list/SelectList';
import { ns } from '../../../.corkboard/cards';

ns('SelectList');

card('PropTypes',
md`
\`\`\`jsx
SelectList.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired, /* will be passed value returned rather than native event */
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  selectedKey: PropTypes.string.isRequired,
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
