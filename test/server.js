import React from 'react';
import ReactDOMServer from 'react-dom/server';
import A11YCheck from './A11YCheck';
import BoxExampleGrid from './BoxExampleGrid';
import ClassicExampleGrid from './ClassicExampleGrid';
import FlexibleExampleGrid from './FlexibleExampleGrid';
import classicGridServerStyles from './classicGridServerStyles';
import flexibleGridServerStyles from './flexibleGridServerStyles';
import stringToColor from '../src/stringToColor';

const express = require('express');

const app = express();

app.use(express.static('views'));

const getRandomColor = () => stringToColor(`${Math.floor(Math.random() * 10000)}`);

const initialPins = [];
for (let i = 0; i < 20; i += 1) {
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
    maxCols={!!req.query.maxCols}
    minCols={Number(req.query.minCols)}
  />);
  res.render('index.ejs', {
    componentTest: 'FlexibleGrid',
    flexibleGridServerStyles,
    reactOutput: content,
    initialPins: JSON.stringify(initialPins),
  });
});

// Endpoint for BoxGrid tests
app.get('/boxpacking', (req, res) => {
  const boxPackingInitialPins = [];
  for (let i = 0; i < 20; i += 1) {
    const r = Math.random();
    let colSpan;
    if (r > 0.95) colSpan = 4;
    else if (r > 0.9) colSpan = 3;
    else if (r > 0.7) colSpan = 2;
    else colSpan = 1;

    boxPackingInitialPins.push({
      name: `foo ${i}`,
      height: Math.floor(Math.random() * 200) + 300,
      color: getRandomColor(),
      colSpan,
    });
  }

  const content = ReactDOMServer.renderToString(<BoxExampleGrid
    constrained={!!req.query.constrained}
    finiteLength={!!req.query.finiteLength}
    initialPins={initialPins}
  />);
  res.render('index.ejs', {
    componentTest: 'BoxGrid',
    reactOutput: content,
    initialPins: JSON.stringify(boxPackingInitialPins),
  });
});

// Endpoint for a11y tests
app.get('/a11y/:component', (req, res) => {
  const content = ReactDOMServer.renderToString(<A11YCheck component={req.params.component} />);
  res.render('index.ejs', {
    componentTest: 'A11YCheck',
    reactOutput: content,
    initialPins: '',
  });
});

app.listen(3000, () => {
    // console.log('Example app listening on port 3000!');
});
