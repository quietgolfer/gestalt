import React from 'react';
import ExampleGrid from './ExampleGrid';
import ReactDOMServer from 'react-dom/server';
import serverStyles from './serverGridItemStyles';

const express = require('express');
const app = express();

app.use(express.static('views'));

function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let initialPins = [];
for (let i = 0; i < 5; i++) {
  initialPins.push({
    name: `foo ${i}`,
    height: Math.floor(Math.random() * 200) + 300,
    color: getRandomColor(),
  });
}

app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToString(<ExampleGrid
    finiteLength={!!req.query.finiteLength}
    initialPins={initialPins}
  />);
  res.render('index.ejs', {
    serverStyles,
    reactOutput: content,
    initialPins: JSON.stringify(initialPins),
  });
});

app.listen(3000, () => {
    // console.log('Example app listening on port 3000!');
});
