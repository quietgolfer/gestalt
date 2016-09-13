const requireCard = require.context('../src', true, /\-doc\.js$/);
[
  'Borders',
  'ClassicGrid',
  'Colors',
  'Columns',
  'Cursor',
  'FlexibleGrid',
  'Heading',
  'Layout',
  'Text',
  'Whitespace',
].forEach(component =>
  requireCard(`./${component}/__docs__/${component}-doc.js`)
);
