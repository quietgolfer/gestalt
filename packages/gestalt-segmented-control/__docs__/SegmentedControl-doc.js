// @flow
import React from 'react';
import { card, md } from 'corkboard';
import SegmentedControl from '../SegmentedControl';
import { ns } from '../../../.corkboard/cards';

ns('Segmented Control',
  `
Segmented Controls may be used to group between multiple selections.
The controls display the current state and related state.

Create layout to convey clear sense of information hierarchy.
When control is engaged, information below the control should get updated.

\`\`\`javascript
SegmentedControl.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  selectedItemIndex: PropTypes.number.isRequired,
};
\`\`\`

`);

card('Example',
  md`
Segmented Controls are naive components, meaning you need to write up the behavior when you click on an item.

If you'd like the tabs to control hiding or showing content that state should
live in a parent component.

\`\`\`js
<SegmentedControl
  selectedItemIndex={0}
  items={['News', 'You', 'Messages']}
/>
\`\`\`
`,
  (atom) => {
    const state = atom.deref();
    return (
      <SegmentedControl
        items={['News', 'You', 'Messages']}
        selectedItemIndex={0}
        {...state}
        onChange={i => atom.set(props => ({
          ...props,
          selectedItemIndex: i,
        }))}
      />
    );
  });
