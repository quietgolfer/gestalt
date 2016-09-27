import '!!style!css?importLoaders=1!postcss!../styles.css';
const requireCard = require.context('../src', true, /\-doc\.js$/);
[
  'Borders',
  'Button',
  'Colors',
  'Columns',
  'Cursor',
  'Divider',
  'BoxGrid',
  'ClassicGrid',
  'FlexibleGrid',
  'Heading',
  'Icon',
  'Image',
  'Layout',
  'Mask',
  'Switch',
  'Text',
  'Whitespace',
].forEach(component =>
  requireCard(`./${component}/__docs__/${component}-doc.js`)
);
