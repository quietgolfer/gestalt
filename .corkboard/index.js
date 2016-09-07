const requireCard = require.context('../src', true, /\-doc\.js$/);
[
  'Borders',
  'Colors',
  'Columns',
  'Cursor',
  'Grid',
  'Heading',
  'Layout',
  'Text',
  'Typography',
  'Whitespace',
].forEach(component =>
  requireCard(`./${component}/__docs__/${component}-doc.js`)
);
