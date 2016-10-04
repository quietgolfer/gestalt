import React from 'react';
import ReactDOM from 'react-dom';
import BoxExampleGrid from '../BoxExampleGrid';
import ClassicExampleGrid from '../ClassicExampleGrid';
import FlexibleGrid from '../FlexibleExampleGrid';

// Wait to mount until the test tells us to do so.
window.addEventListener('trigger-mount', () => {
  const mountNode = document.getElementById('react-main-mount');

  if (window.componentTest === 'ClassicGrid') {
    ReactDOM.render(<ClassicExampleGrid
      collage={window.location.search.includes('collage')}
      constrained={window.location.search.includes('constrained')}
      constructorItemSplice={window.location.search.includes('constructorItemSplice')}
      finiteLength={window.location.search.includes('finiteLength')}
      initialPins={window.initialPins}
    />, mountNode);
  } else if (window.componentTest === 'FlexibleGrid') {
    ReactDOM.render(<FlexibleGrid
      collage={window.location.search.includes('collage')}
      constrained={window.location.search.includes('constrained')}
      constructorItemSplice={window.location.search.includes('constructorItemSplice')}
      finiteLength={window.location.search.includes('finiteLength')}
      initialPins={window.initialPins}
      maxCols={window.location.search.includes('maxCols')}
    />, mountNode);
  } else if (window.componentTest === 'BoxGrid') {
    ReactDOM.render(<BoxExampleGrid
      constrained={window.location.search.includes('constrained')}
      finiteLength={window.location.search.includes('finiteLength')}
      initialPins={window.initialPins}
    />, mountNode);
  }
});
