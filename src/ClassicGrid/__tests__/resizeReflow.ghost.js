/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const PIN_SIZE = 235;
const RESIZE_DEBOUNCE = 100;

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

const triggerReisze = async (resizeWidthTo) => {
  await ghost.script((newWidth) => {
    // Mock out the window width for the next resize calculation.
    const gridWrapper = document.getElementById('gridWrapper');
    gridWrapper.style.width = `${newWidth}px`;
    window.dispatchEvent(new Event('resize'));
  }, [resizeWidthTo]);
};

describe('ClassicGrid > Resize', () => {
  it('Reflows the grid after a resize', async () => {
    const GRID_WIDTH = 1000;

    // This test cares about page size, so close the previous instance to ensure
    // we open a new window with the correct dimensions.
    ghost.close();

    // First load the page with javascript disabled to get the item position
    await ghost.open('http://localhost:3000/ClassicGrid', {
      viewportSize: {
        width: GRID_WIDTH,
        height: 800,
      },
    });
    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const expectedColumns = Math.floor(GRID_WIDTH / PIN_SIZE);
    assert.equal(await countColumns(), expectedColumns, `expected ${expectedColumns} columns`);

    await triggerReisze(GRID_WIDTH - PIN_SIZE);

    // Wait for the resize debounce to complete.
    await ghost.wait(RESIZE_DEBOUNCE);
    assert.equal(await countColumns(), expectedColumns - 1,
      `expected ${expectedColumns - 1} columns after resize`);
  });
});
