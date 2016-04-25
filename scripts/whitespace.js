// whitespace scale TBD:
//
//   0 = 0
//   1 = 1bp = 4px
//   2 = 2bp = 8px
//   3 = 4bp = 16px
//   4 = 6bp = 24px
//   5 = 8pb = 32px
//
// m{t,r,b,l,x,y}-{0,5}
// m{x,y}n-{1,5}
// mx-auto
//
// p{t,r,b,l,x,y}-{0,5}

var breakpoints = ['sm', 'md', 'lg'];

var scale = [
  ['0', '0'],
  ['var(--space-1)', 'calc(0 - var(--space-1))'],
  ['var(--space-2)', 'calc(0 - var(--space-2))'],
  ['var(--space-3)', 'calc(0 - var(--space-3))'],
  ['var(--space-4)', 'calc(0 - var(--space-4))'],
  ['var(--space-5)', 'calc(0 - var(--space-5))']
];

breakpoints.forEach(function(breakpoint) {
    console.log(`@media (--breakpoint-${breakpoint}) {`);

    scale.forEach(function(value, i) {
        console.log(`
    .${breakpoint}-m${i} { margin: ${value[0]}; }
    .${breakpoint}-mt${i} { margin-top: ${value[0]}; }
    .${breakpoint}-mr${i} { margin-right: ${value[0]}; }
    .${breakpoint}-mb${i} { margin-bottom: ${value[0]}; }
    .${breakpoint}-ml${i} { margin-left: ${value[0]}; }
    .${breakpoint}-mxn${i} {
        margin-right: ${value[1]};
        margin-left: ${value[1]};
    }
    .${breakpoint}-myn${i} {
        margin-top: ${value[1]};
        margin-bottom: ${value[1]};
    }
    .${breakpoint}-p${i} {
        padding: ${value[0]};
    }
    .${breakpoint}-px${i} {
        padding-left: ${value[0]};
        padding-right: ${value[0]};
    }
    .${breakpoint}-py${i} {
        padding-top: ${value[0]};
        padding-bottom: ${value[0]};
    }`);
    });

    console.log('}');
});
