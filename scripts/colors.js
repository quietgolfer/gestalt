/* eslint-env node */

var primary = [
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

var alt = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
].reduce(function(acc, color) {
    for(var n=1; n<=10; ++n) {
        acc.push(color + '-' + n);
    }
    return acc;
}, []);

var colors = [].concat(primary, alt);

colors.forEach(function(color) {
    console.log(`
/* ${color} */

.${color} { color: var(--${color}); }
.${color}-hover:hover { color: var(--${color}); }
.bg-${color} { background-color: var(--${color}); }
.bg-${color}-hover:hover { background-color: var(--${color}); }`);
});
