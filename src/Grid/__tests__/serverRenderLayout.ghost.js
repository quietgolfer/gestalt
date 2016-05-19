/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
    gridItem: '[class^="Grid__Grid__Item"]',
    staticItem: '.static'
};

describe('Server Render Layout', () => {

    it('items rendered on the server maintain position after mounting', async () => {
        // First load the page with javascript disabled to get the item position
        await ghost.open('http://localhost:3000');

        let serverItems = await ghost.findElements(selectors.staticItem);
        assert.equal(serverItems.length, 5);

        let serverItem1Rect = await serverItems[0].rect();
        let serverItem2Rect = await serverItems[1].rect();

        assert(serverItem1Rect.left >= 0);
        assert(serverItem2Rect.left >= serverItem1Rect.right);

        await ghost.script(() => {
            window.dispatchEvent(new CustomEvent('trigger-mount'));
        });

        let gridItems = await ghost.findElements(selectors.gridItem);
        assert.equal(gridItems.length, 20);

        let gridItem1Rect = await gridItems[0].rect();
        let gridItem2Rect = await gridItems[1].rect();
        assert.equal(gridItem1Rect.left, serverItem1Rect.left);
        assert.equal(gridItem1Rect.right, serverItem1Rect.right);
        assert.equal(gridItem2Rect.left, serverItem2Rect.left);
        assert.equal(gridItem2Rect.right, serverItem2Rect.right);
    });
});
