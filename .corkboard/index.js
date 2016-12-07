import '!!style!css?importLoaders=1!postcss!../packages/pinterest-gestalt/styles.css';
const requireCard = require.context('../packages', true, /\-doc\.js$/);
[
  ['gestalt-avatar', 'Avatar'],
  ['gestalt-borders', 'Borders'],
  ['gestalt-button', 'Button'],
  ['gestalt-colors', 'Colors'],
  ['gestalt-column', 'Column'],
  ['gestalt-container', 'Container'],
  ['gestalt-cursor', 'Cursor'],
  ['gestalt-divider', 'Divider'],
  ['gestalt-box-grid', 'BoxGrid'],
  ['gestalt-classic-grid', 'ClassicGrid'],
  ['gestalt-flexible-grid', 'FlexibleGrid'],
  ['gestalt-group-avatar', 'GroupAvatar'],
  ['gestalt-heading', 'Heading'],
  ['gestalt-icon', 'Icon'],
  ['gestalt-icon-button', 'IconButton'],
  ['gestalt-image', 'Image'],
  ['gestalt-label', 'Label'],
  ['gestalt-layout', 'Layout'],
  ['gestalt-letterbox', 'Letterbox'],
  ['gestalt-mask', 'Mask'],
  ['gestalt-media-query', 'MediaQuery'],
  ['gestalt-segmented-control', 'SegmentedControl'],
  ['gestalt-select-list', 'SelectList'],
  ['gestalt-switch', 'Switch'],
  ['gestalt-text', 'Text'],
  ['gestalt-text-field', 'TextField'],
  ['gestalt-whitespace', 'Whitespace'],
].forEach(pair =>
  requireCard(`./${pair[0]}/__docs__/${pair[1]}-doc.js`)
);
