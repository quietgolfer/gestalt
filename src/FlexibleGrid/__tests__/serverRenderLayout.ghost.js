/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
  gridItem: '[class^="Grid__Grid__Item"]',
  staticItem: '.static',
};

describe('FlexibleGrid > Server Render Layout', () => {
  it('items rendered on the server maintain position after mounting', async () => {
    ghost.close();
    // First load the page with javascript disabled to get the item position
    await ghost.open('http://localhost:3000/FlexibleGrid?deferMount=1', {
      viewportSize: {
        width: 1200,
        height: 800,
      },
    });

    const serverItems = await ghost.findElements(selectors.staticItem);

    // Hard-coded value for initial pins in server.js
    assert.equal(serverItems.length, 20);

    // Server rendered inner items have a width of auto.
    for (let i = 0; i < serverItems.length; i += 1) {
      const width = await serverItems[i].script(el => el.children[0].style.width);
      assert.equal(width, 'auto', `Width of "${width}" is not auto.`);
    }

    const serverItem1Rect = await serverItems[0].rect();
    const serverItem2Rect = await serverItems[1].rect();

    assert(serverItem1Rect.left >= 0);
    assert(serverItem2Rect.left >= serverItem1Rect.right);

    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const gridItems = await ghost.findElements(selectors.gridItem);
    assert.ok(gridItems.length >= 20);

    // After mounting, inner items should have a width set.
    for (let i = 0; i < gridItems.length; i += 1) {
      const width = await gridItems[i].script(el => el.children[0].style.width);
      assert.ok(parseInt(width, 10) > 0, `Width of "${width}" is a number greater than 0.`);
    }

    const gridItem1Rect = await gridItems[0].rect();
    const gridItem2Rect = await gridItems[1].rect();
    assert.equal(gridItem1Rect.left, serverItem1Rect.left);
    assert.equal(gridItem1Rect.right, serverItem1Rect.right);
    assert.equal(gridItem2Rect.left, serverItem2Rect.left);
    assert.equal(gridItem2Rect.right, serverItem2Rect.right);
  });
});
