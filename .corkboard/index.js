import '!!style!css?importLoaders=1!postcss!../styles.css';
const requireCard = require.context('../src', true, /\-doc\.js$/);
[
  'Borders',
  'Button',
  'ClassicGrid',
  'Colors',
  'Columns',
  'Cursor',
  'Divider',
  'FlexibleGrid',
  'Heading',
  'Icon',
  'Layout',
  'Switch',
  'Text',
  'Whitespace',
].forEach(component =>
  requireCard(`./${component}/__docs__/${component}-doc.js`)
);
