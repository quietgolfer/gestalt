import React from 'react';
import Tabs from '../Tabs';
import { card, doc, ns } from 'devcards';

ns('Tabs');

card('Tabs',
    doc`# Tabs

Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.

A segmented control can display a title (an NSString object) or an image (UIImage object). The UISegmentedControl object automatically resizes segments to fit proportionally within their superview unless they have a specific width set. When you add and remove segments, you can request that the action be animated with sliding and fading effects.

    <Tabs items={['First', 'Second', 'Third']} selectedItemIndex={1} />

`,

    <Tabs items={['First', 'Second', 'Third']} selectedItemIndex={1} />,
    {},
    {heading: false});

card('Usage',
    doc`Tabs are dumb components, meaning you need to write up the behavior when you click on an item. This simple example takes the index provided by the \`onChange\` callback and sets the \`selectedItemIndex\`.

If you'd like the tabs to control hiding or showing content that state should live in a parent component.`,
    (atom) => {
        const state = atom.deref();
        return (
            <div className="p2">
                <Tabs
                    items={['News', 'You', 'Messages']}
                    {...state}
                    onChange={(i) => atom.set(props => ({
                        ...props,
                        selectedItemIndex: i
                    }))}
                />
            </div>
        );
    },
    {selectedItemIndex: 0},
    {inspectData: true});
