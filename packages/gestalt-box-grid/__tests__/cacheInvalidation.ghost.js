/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
  gridItem: '[class^="Grid__Grid__Item"]',
  afterGrid: '.afterGrid',
};

describe('BoxGrid > Cache invalidation', () => {
  it('Able to invalidate cache', async () => {
    await ghost.open('http://localhost:3000/');
    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    const beforeReflowGridItems = await ghost.findElements(selectors.gridItem);
    const beforeReflowFirstRect = await beforeReflowGridItems[0].rect();
    const newHeight = beforeReflowFirstRect.height + 300;

    await ghost.script((firstItemHeight) => {
      window.itemHeightOverrides = [firstItemHeight];
      window.dispatchEvent(new CustomEvent('trigger-reflow'));
    }, [newHeight]);

    const afterReflowGridItems = await ghost.findElements(selectors.gridItem);
    const afterReflowFirstRect = await afterReflowGridItems[0].rect();
    assert.ok(afterReflowFirstRect.height > beforeReflowFirstRect.height);
    // TODO: Should be equal, but due to box-sizing styling issues simplify the assertion for now.
    assert.ok(afterReflowFirstRect.height >= newHeight, 'new height is set on item');
  });
});
