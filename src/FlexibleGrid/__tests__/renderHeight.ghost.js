/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
  gridItem: '[class^="Grid__Grid__Item"]',
  afterGrid: '.afterGrid',
};

describe('FlexibleGrid > Render Height', () => {
  it('Items can be positioned under the grid', async () => {
    await ghost.open('http://localhost:3000/flexible/?finiteLength=1');
    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const gridItems = await ghost.findElements(selectors.gridItem);
    assert.equal(gridItems.length, 20);

    let bottomItem = 0;
    gridItems.forEach(async (item) => {
      const itemRect = await item.rect();
      if (itemRect.bottom > bottomItem) {
        bottomItem = itemRect.bottom;
      }
    });

    const afterGrid = await ghost.findElement(selectors.afterGrid);
    const afterGridRect = await afterGrid.rect();
    assert.ok(afterGridRect.top >= bottomItem);
  });
});
