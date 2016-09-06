/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
  gridItem: '[class^="Grid__Grid__Item"]',
};

describe('Collage Layout', () => {
  it('Verifies a collage layout', async () => {
    await ghost.open('http://localhost:3000/?finiteLength=1&collage=1');
    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    // Assert that all items follow the indentation of the grid.
    const gridItems = await ghost.findElements(selectors.gridItem);

    assert.ok(gridItems.length === 20, 'There are 5 grid items (hard-coded in the fixture)');

    // Record the left position of all items.
    const itemLeftMap = {};

    for (let i = 0; i < gridItems.length; i++) {
      const itemRect = await gridItems[i].rect();
      itemLeftMap[itemRect.left] = itemLeftMap[itemRect.left] || [];
      itemLeftMap[itemRect.left].push(itemRect);
    }

    assert.equal(Object.keys(itemLeftMap).length, 2, 'There are two columns of pins.');
    for (let i = 0; i < itemLeftMap.length; i++) {
      assert.ok(itemLeftMap[i].length >= 2, 'there are at least two items in each column');
    }
  });
});
