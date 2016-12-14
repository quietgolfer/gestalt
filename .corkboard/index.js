import '!!style!css?importLoaders=1!postcss!../src/index.css';
const requireCard = require.context('../src', true, /\-doc\.js$/);
const paths = requireCard.keys();
paths.sort(function (a, b) { return a.localeCompare(b); });
paths.forEach(requireCard);
