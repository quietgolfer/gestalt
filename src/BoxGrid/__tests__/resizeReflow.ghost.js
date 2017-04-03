/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const PIN_SIZE = 236;
const RESIZE_DEBOUNCE = 300;

const selectors = {
  gridItem: '[class^="Grid__Grid__Item"]',
  staticItem: '.static',
};

const countColumns = async () => {
  const itemLeftMap = {};
  const gridItems = await ghost.findElements(selectors.gridItem);

  for (let i = 0; i < gridItems.length; i += 1) {
    const itemRect = await gridItems[i].rect();
    itemLeftMap[itemRect.left] = itemLeftMap[itemRect.left] || [];
    itemLeftMap[itemRect.left].push(itemRect);
  }
  return Object.keys(itemLeftMap).length;
};

const triggerResize = async (resizeWidthTo) => {
  await ghost.script((newWidth) => {
    // Mock out the window width for the next resize calculation.
    const gridWrapper = document.getElementById('gridWrapper');
    gridWrapper.style.width = `${newWidth}px`;
    window.dispatchEvent(new Event('resize'));
  }, [resizeWidthTo]);
};

describe('BoxGrid > Resize', () => {
  it('Reflows the grid after a resize', async () => {
    const GRID_WIDTH = 1600;

    // This test cares about page size, so close the previous instance to ensure
    // we open a new window with the correct dimensions.
    ghost.close();

    // First load the page with javascript disabled to get the item position
    await ghost.open('http://localhost:3000/BoxGrid', {
      viewportSize: {
        width: GRID_WIDTH,
        height: 800,
      },
    });

    const expectedColumns = Math.floor(GRID_WIDTH / PIN_SIZE);
    assert.equal(await countColumns(), expectedColumns, `expected ${expectedColumns} columns`);

    await ghost.wait(RESIZE_DEBOUNCE);

    await triggerResize(GRID_WIDTH - PIN_SIZE);

    // Wait for the resize debounce to complete.
    await ghost.wait(RESIZE_DEBOUNCE);
    const newColCount = await countColumns();
    assert.notEqual(newColCount, expectedColumns,
      'expected column count to change after resize');
  });
});
