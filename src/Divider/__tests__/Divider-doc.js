import React from 'react';
import Divider from '../Divider';
import { card, doc, ns } from 'devcards';

ns('Divider');

card('Divider',
    doc`If you have two things that need to be separated, put a \`Divider\` between them.`,
    <div>
        <div className="p1">{'Some content'}</div>
        <Divider />
        <div className="p1">{'Other content'}</div>
    </div>);
