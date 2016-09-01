const requireCard = require.context('../src', true, /\-doc\.js$/);
requireCard.keys().map(path => requireCard(path));
