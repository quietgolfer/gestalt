/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
  gridItem: '[class^="Grid__Grid__Item"]',
  staticItem: '.static',
};

/**
 * We've seen instances of folks mutating grid items between the constructor and componentDidMount.
 * This is a bad practice, but regardless the grid should be able to support when this happens.
 * This test tries to ensure that we don't break in that condition.
 */
describe('ClassicGrid > Item Mutation', () => {
  const staticMeasurements = [];

  it('items render appropriately when mutating between constructor and mounting', async () => {
    ghost.close();

    await ghost.open('http://localhost:3000/ClassicGrid?deferMount=1&constructorItemSplice=1', {
      viewportSize: {
        width: 1400,
        height: 800,
      },
    });

    const staticItems = await ghost.findElements(selectors.staticItem);
    for (let i = 0; i < staticItems.length; i += 1) {
      const itemRect = await staticItems[i].rect();
      staticMeasurements.push(itemRect);
    }

    assert.ok(staticItems.length === 5, 'There are 5 initial static items');

    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });
  });

  it('the top value should not change after a server hydration.', async () => {
    const hydratedItems = await ghost.findElements(selectors.gridItem);
    for (let i = 0; i < staticMeasurements.length; i += 1) {
      const hydratedItemRect = await hydratedItems[i].rect();
      assert.equal(staticMeasurements[i].height, hydratedItemRect.height);
      assert.equal(hydratedItemRect.top, 0);
    }
  });
});
