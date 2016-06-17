import React from 'react';
import ReactDOM from 'react-dom';
import ExampleGrid from '../ExampleGrid';

// Wait to mount until the test tells us to do so.
window.addEventListener('trigger-mount', () => {
  const mountNode = document.getElementById('react-main-mount');
  ReactDOM.render(<ExampleGrid initialPins={window.initialPins} />, mountNode);
});
