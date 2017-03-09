/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
  gridItem: '[class*="Masonry__Masonry__Item"]',
  staticItem: '.static',
};

describe('Masonry > Server Render Layout', () => {
  it('items rendered on the server maintain position after mounting', async () => {
    ghost.close();
    // First load the page with javascript disabled to get the item position
    await ghost.open('http://localhost:3000/Masonry?deferMount=1', {
      viewportSize: {
        width: 1000,
        height: 1000,
      },
    });

    const serverItems = await ghost.findElements(selectors.staticItem);

    // Hard-coded value for initial pins in server.js
    assert.equal(serverItems.length, 20);

    const serverItem1Rect = await serverItems[0].rect();
    const serverItem2Rect = await serverItems[1].rect();

    assert(serverItem1Rect.left >= 0);
    assert(serverItem2Rect.left >= serverItem1Rect.right);

    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const gridItems = await ghost.findElements(selectors.gridItem);
    assert.ok(gridItems.length > 2);

    const gridItem1Rect = await gridItems[0].rect();
    const gridItem2Rect = await gridItems[1].rect();

    assert.equal(gridItem1Rect.left, serverItem1Rect.left);
    // Simple placement assertion for now because we position masonry with transforms.
    assert.ok(gridItem2Rect.left > 0);
  });

  it('[flexible] items rendered on the server start with columnWidth', async () => {
    ghost.close();
    // First load the page with javascript disabled to get the item position
    await ghost.open('http://localhost:3000/Masonry?deferMount=1&flexible=1', {
      viewportSize: {
        width: 1200,
        height: 1000,
      },
    });

    const serverItems = await ghost.findElements(selectors.staticItem);
    const serverItem = await serverItems[0].rect();
    assert.equal(serverItem.width, 236);

    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    // Grew to fit available space
    const clientItems = await ghost.findElements(selectors.gridItem);
    const clientItem = await clientItems[0].rect();
    assert.equal(clientItem.width, 286);
  });
});
