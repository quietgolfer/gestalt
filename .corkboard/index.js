import '!!style!css?importLoaders=1!postcss!../packages/pinterest-gestalt/styles.css';
const requireCard = require.context('../packages', true, /\-doc\.js$/);
[
  ['gestalt-borders', 'Borders'],
  ['gestalt-button', 'Button'],
  ['gestalt-colors', 'Colors'],
  ['gestalt-columns', 'Columns'],
  ['gestalt-cursor', 'Cursor'],
  ['gestalt-divider', 'Divider'],
  ['gestalt-box-grid', 'BoxGrid'],
  ['gestalt-classic-grid', 'ClassicGrid'],
  ['gestalt-flexible-grid', 'FlexibleGrid'],
  ['gestalt-heading', 'Heading'],
  ['gestalt-icon', 'Icon'],
  ['gestalt-image', 'Image'],
  ['gestalt-layout', 'Layout'],
  ['gestalt-mask', 'Mask'],
  ['gestalt-switch', 'Switch'],
  ['gestalt-text', 'Text'],
  ['gestalt-whitespace', 'Whitespace'],
].forEach(pair =>
  requireCard(`./${pair[0]}/__docs__/${pair[1]}-doc.js`)
);
