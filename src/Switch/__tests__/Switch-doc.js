import React from 'react';
import Switch from '../Switch';
import { card, doc, ns } from 'devcards';

ns('Switch');

card('Switch',
    doc`# Switch

If you have stuff you need to fit into a shape, put a \`Mask\` on it.`,
    <div className="flex mxn1">
        <div className="p1">
            <Switch />
        </div>
        <div className="p1">
            <Switch switched />
        </div>
    </div>
    , {}, {heading: false});

card('Switch',
    doc`Live example:`,
    (atom) => {
        return (
            <Switch
                onChange={() => atom.reset({switched: !atom.deref().switched})}
                switched={atom.deref().switched}
            />
        );
    },
    {switched: false},
    {heading: false});
