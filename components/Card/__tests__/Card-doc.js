import React from 'react';
import Card from '../Card';
import { card, doc, ns } from 'devcards';

ns('Card');

card('Card',
    doc`Cards are used to group content in a homogenous list of items. They are primarily used as the building block of Pins.`,
    <Card><div className="p1">Yay a card</div></Card>);

card('Example usage',
    doc`Cards don't have to be used just for Pins. You can put anything inside of a card.`,
    (
    <div className="p2" style={{backgroundColor: '#EFEFEF'}}>
        <Card>
            <a className="block p2 bold" href="">
                <div className="right">
                    &rarr;
                </div>
                Invite friends to Pinterest
            </a>
        </Card>
    </div>));
