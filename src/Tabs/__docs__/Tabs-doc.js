import React from 'react';
import Tabs from '../Tabs';
import { card, md, ns } from 'corkboard';

ns('Tabs');

card('Tabs',
  md`# Tabs

Lorem ipsum dolor sit amet.

  <Tabs items={['First', 'Second', 'Third']} selectedItemIndex={1} />

`,

  <Tabs items={['First', 'Second', 'Third']} selectedItemIndex={1} />,
  {},
  { heading: false });

card('Usage',
  md`Tabs are dumb components, meaning you need to write up the behavior when you click on an item.

If you'd like the tabs to control hiding or showing content that state should
live in a parent component.`,
  (atom) => {
    const state = atom.deref();
    return (
      <Tabs
        items={['News', 'You', 'Messages']}
        {...state}
        onChange={(i) => atom.set(props => ({
          ...props,
          selectedItemIndex: i,
        }))}
      />
    );
  },
  { selectedItemIndex: 0 },
  { inspectData: true, history: true });
