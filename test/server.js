import React from 'react';
import ClassicExampleGrid from './ClassicExampleGrid';
import FlexibleExampleGrid from './FlexibleExampleGrid';
import ReactDOMServer from 'react-dom/server';
import classicGridServerStyles from './classicGridServerStyles';
import flexibleGridServerStyles from './flexibleGridServerStyles';

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
for (let i = 0; i < 20; i++) {
  initialPins.push({
    name: `foo ${i}`,
    height: Math.floor(Math.random() * 200) + 300,
    color: getRandomColor(),
  });
}

// Endpoint for ClassicGrid tests
app.get('/', (req, res) => {
  const content = ReactDOMServer.renderToString(<ClassicExampleGrid
    collage={!!req.query.collage}
    constructorItemSplice={!!req.query.constructorItemSplice}
    constrained={!!req.query.constrained}
    finiteLength={!!req.query.finiteLength}
    initialPins={initialPins}
  />);
  res.render('index.ejs', {
    componentTest: 'ClassicGrid',
    classicGridServerStyles,
    reactOutput: content,
    initialPins: JSON.stringify(initialPins),
  });
});

// Endpoint for FlexibleGrid tests
app.get('/flexible', (req, res) => {
  const content = ReactDOMServer.renderToString(<FlexibleExampleGrid
    collage={!!req.query.collage}
    constructorItemSplice={!!req.query.constructorItemSplice}
    constrained={!!req.query.constrained}
    finiteLength={!!req.query.finiteLength}
    initialPins={initialPins}
  />);
  res.render('index.ejs', {
    componentTest: 'FlexibleGrid',
    flexibleGridServerStyles,
    reactOutput: content,
    initialPins: JSON.stringify(initialPins),
  });
});

app.listen(3000, () => {
    // console.log('Example app listening on port 3000!');
});
