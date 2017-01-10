/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
  gridItem: '[class^="Grid__Grid__Item"]',
  staticItem: '.static',
};

describe('ClassicGrid > Scrolls', () => {
  it('Loads more when it gets to the bottom of the viewport', async () => {
    // First load the page with javascript disabled to get the item position
    ghost.close();
    await ghost.open('http://localhost:3000/ClassicGrid', {
      viewportSize: {
        width: 3000,
        height: 2000,
      },
    });

    const serverItems = await ghost.findElements(selectors.staticItem);

    // Hard-coded value for initial pins in server.js
    const initialServerItemCount = 20;
    assert.equal(serverItems.length, initialServerItemCount);

    await ghost.script(() => {
      window.dispatchEvent(new CustomEvent('trigger-mount'));
    });

    // We should fetch more items on render to fill the viewport.
    let afterLoadItemCount;
    let gridItems;
    await ghost.wait(async () => {
      gridItems = await ghost.findElements(selectors.gridItem);
      afterLoadItemCount = gridItems.length;
      return afterLoadItemCount > initialServerItemCount;
    });

    await ghost.script(() => {
      window.scrollTo(0, window.scrollMaxY);
    });

    await ghost.wait(async () => {
      gridItems = await ghost.findElements(selectors.gridItem);
      return gridItems.length > afterLoadItemCount;
    });
  });
});
