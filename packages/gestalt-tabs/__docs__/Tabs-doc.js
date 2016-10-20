// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Tabs from '../Tabs';
import { ns } from '../../../.corkboard/cards';

ns('Tabs',
  `
Tabs may be used to group between multiple selections.
The controls display the current state and related state.

Create layout to convey clear sense of information hierarchy.
When control is engaged, information below the control should get updated.
`);

card('Example',
  md`
Tabs are dumb components, meaning you need to write up the behavior when you click on an item.

If you'd like the tabs to control hiding or showing content that state should
live in a parent component.

\`\`\`js
<Tabs
  items={['News', 'You', 'Messages']}
/>
\`\`\`
`,
  (atom) => {
    const state = atom.deref();
    return (
      <Tabs
        items={['News', 'You', 'Messages']}
        {...state}
        onChange={i => atom.set(props => ({
          ...props,
          selectedItemIndex: i,
        }))}
      />
    );
  },
  { selectedItemIndex: 0 },
  { inspectData: true, history: true });
