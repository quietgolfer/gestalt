import React from 'react';
import Tabs from '../Tabs';
import { card, doc, ns } from 'devcards';

ns('Tabs');

card('Tabs',
    doc`A UISegmentedControl object is a horizontal control made of multiple segments, each segment functioning as a discrete button. A segmented control affords a compact means to group together a number of controls.

    <Tabs />

A segmented control can display a title (an NSString object) or an image (UIImage object). The UISegmentedControl object automatically resizes segments to fit proportionally within their superview unless they have a specific width set. When you add and remove segments, you can request that the action be animated with sliding and fading effects.`,

    <Tabs items={['First', 'Second', 'Third']} selectedItemIndex={1} />);

card('Example',
    doc`Tabs are dumb components, meaning you need to write up the behavior when you click on an item.`,
    (atom) => {
        const state = atom.deref();
        return (
            <div className="p2" style={{backgroundColor: '#EFEFEF'}}>
                <Tabs
                    {...state}
                    onChange={(i) => atom.set(props => ({
                        ...props,
                        selectedItemIndex: i
                    }))}
                />
            </div>
        );
    },
    {items: ['News', 'You', 'Messages'], selectedItemIndex: 0},
    {inspectData: true});
