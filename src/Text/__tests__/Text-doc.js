import React from 'react';
import Text from '../Text';
import { card, doc, ns } from 'devcards';

ns('Text');

card('Text',
    doc`Pretty standard, really.`,
    <div>
        <Text size="xs">{'Text extra small'}</Text>
        <Text size="s">{'Text small'}</Text>
        <Text size="m">{'Text medium'}</Text>
        <Text size="l">{'Text large'}</Text>
        <Text size="xl">{'Text extra large'}</Text>
    </div>);
