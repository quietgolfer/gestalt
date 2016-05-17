import React from 'react';
import Divider from '../../Divider/Divider';
import Heading from '../Heading';
import { card, doc, ns } from 'devcards';

ns('Heading');

card('Heading',
    doc`# Headings

In all their glory.`,
    null,
    {},
    {heading: false});

card('Sizes',
    doc`Comes in a variety of sizes:`,
    <div>
        <Divider />
        <Heading size="xs">{'Heading extra small'}</Heading>
        <Divider />
        <Heading size="s">{'Heading small'}</Heading>
        <Divider />
        <Heading size="m">{'Heading medium'}</Heading>
        <Divider />
        <Heading size="l">{'Heading large'}</Heading>
        <Divider />
        <Heading size="xl">{'Heading extra large'}</Heading>
        <Divider />
    </div>,
    {},
    {heading: false});

card('Colors',
    doc`And a variety of colors:`,
    <div>
        <div style={{backgroundColor: '#555'}}>
            <Heading color="white" size="m">{'White'}</Heading>
        </div>
        <Heading size="m">{'Dark gray (default)'}</Heading>
        <Heading color="light-gray" size="m">{'Light gray'}</Heading>
        <Heading color="blue" size="m">{'Blue'}</Heading>
    </div>,
    {},
    {heading: false});
