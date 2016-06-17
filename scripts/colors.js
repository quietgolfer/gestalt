#!/usr/bin/env node

/* eslint-env node */
/* eslint no-console:0 */

const colors = [
  'blue',
  'dark-gray',
  'dark-green',
  'light-gray',
  'pink',
  'red',
  'slate-green',
  'super-light-gray',
  'white',
  'yellow',
];

colors.forEach((color) => {
  console.log(`
/* ${color} */

.${color} {
  color: var(--${color});
}

.${color}-hover:hover {
  color: var(--${color});
}

.bg-${color} {
  background-color: var(--${color});
}

.bg-${color}-hover:hover {
  background-color: var(--${color});
}`);
});
