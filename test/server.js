import React from 'react';
import ExampleGrid from './ExampleGrid';
import ReactDOMServer from 'react-dom/server';
import serverStyles from './serverGridItemStyles';

var express = require('express');
var app = express();

app.use(express.static('views'));

function getRandomColor() {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let initialPins = [];
for (let i = 0; i < 5; i++) {
    initialPins.push({
        name: 'foo ' + i,
        height: Math.floor(Math.random() * 200) + 300,
        color: getRandomColor()
    });
}

app.get('/', function (req, res) {
    let content = ReactDOMServer.renderToString(<ExampleGrid initialPins={initialPins} />);
    res.render('index.ejs', {
        reactOutput: content,
        serverStyles: serverStyles,
        initialPins: JSON.stringify(initialPins)
    });
});

app.listen(3000, function () {
    // console.log('Example app listening on port 3000!');
});
