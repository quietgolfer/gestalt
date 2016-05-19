// Generate initial server styles for the grid.
let styles = '';
let minColumns = 3;
let maxColumns = 10;
let itemMargin = 14;
let itemWidth = 250;
let minWidth = 0;
let maxWidth = minColumns * itemWidth + itemWidth - 1;

for (var i = minColumns; i < maxColumns + 1; i++) {
    styles += `
@media (min-width: ${minWidth}px) and (max-width: ${maxWidth}px) {
    .static:nth-child(-n+${i}) {
        float: left;
        position: static;
        visibility: visible;
        margin: 0 ${itemMargin / 2}px;
    }
    .gridCentered {
        width: ${i * itemWidth}px;
    }
}

`;
    minWidth = maxWidth + 1;
    maxWidth = maxWidth + itemWidth;
}
styles += `
.static {
    position: absolute;
    visibility: hidden;
}
.gridCentered {
    margin: 0 auto;
}
`;

export default styles;
