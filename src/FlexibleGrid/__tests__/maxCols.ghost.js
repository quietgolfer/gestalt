/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const GRID_WIDTH = 1200;
const PIN_MIN_WIDTH = 236;

const selectors = {
  gridItem: '[class^="Grid__Grid__Item"]',
};

const getColumnPositions = async () => {
  const gridItems = await ghost.findElements(selectors.gridItem);
  const itemLeftMap = {};

  for (let i = 0; i < gridItems.length; i += 1) {
    const itemRect = await gridItems[i].rect();
    itemLeftMap[itemRect.left] = itemLeftMap[itemRect.left] || [];
    itemLeftMap[itemRect.left].push(itemRect);
  }
  return Object.keys(itemLeftMap);
};

describe('FlexibleGrid > maxCols Prop', () => {
  it('Verifies col count with maxCols prop', async () => {
    ghost.close();
    // First load the page with javascript disabled to get the item position
    await ghost.open('http://localhost:3000/FlexibleGrid?maxCols=1', {
      viewportSize: {
        width: GRID_WIDTH,
        height: 800,
      },
    });

    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const columnPositions = await getColumnPositions();
    assert.equal(columnPositions.length, 2, 'Two columns of pins when passing in maxCols.');
  });

  it('Verifies col count without maxCols prop', async () => {
    // Validate column count without the maxCols test prop
    await ghost.open('http://localhost:3000/FlexibleGrid');
    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });
    const columnPositions = await getColumnPositions();
    assert.equal(columnPositions.length, Math.floor(GRID_WIDTH / PIN_MIN_WIDTH),
      'Five columns of pins without maxCols.');
  });
});
