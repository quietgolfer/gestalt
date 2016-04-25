import React from 'react';
import TextField from '../TextField';
import { card, doc, ns } from 'devcards';

ns('TextField');

card('TextField',
    doc`Donec ut lorem commodo, condimentum lacus quis, efficitur lacus. Donec mattis erat lorem, vel commodo ante malesuada vitae. Fusce ac auctor orci. Maecenas at enim dolor. Aliquam ultricies ut nibh convallis accumsan. Sed tempor elit tellus, eu viverra lacus pellentesque mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent finibus dui sed faucibus vestibulum.`,
    <TextField readOnly value="Foo" />);
