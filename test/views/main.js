import React from 'react';
import ReactDOM from 'react-dom';
import RenderConfig from '../utils/renderConfig';

// Wait to mount until the test tells us to do so.
window.addEventListener('trigger-mount', () => {
  const mountNode = document.getElementById('react-main-mount');
  const { Component } = RenderConfig[window.COMPONENT_NAME];
  ReactDOM.render(<Component {...window.COMPONENT_PROPS} />, mountNode);
});
