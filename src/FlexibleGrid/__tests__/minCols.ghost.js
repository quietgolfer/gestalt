/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const viewportSize = {
  width: 300,
  height: 800,
};
const mount = () => window.dispatchEvent(new CustomEvent('trigger-mount'));

const getNumColumns = async () => {
  const gridItems = await ghost.findElements('[class^="Grid__Grid__Item"]');
  const leftPosMap = {};

  // Go until you repeat a left position
  for (let i = 0; i < gridItems.length; i += 1) {
    const { left } = await gridItems[i].rect();
    if (leftPosMap[left]) {
      break;
    } else {
      leftPosMap[left] = true;
    }
  }
  return Object.keys(leftPosMap).length;
};

describe('FlexibleGrid > minCols Prop', () => {
  it('should have two columns when minCols=2 set', async () => {
    ghost.close();
    await ghost.open('http://localhost:3000/FlexibleGrid?minCols=2', { viewportSize });
    await ghost.script(mount);
    assert.equal(await getNumColumns(), 2, 'Two columns of pins when passing in minCols.');
  });

  it('should have one column when not set', async () => {
    ghost.close();
    await ghost.open('http://localhost:3000/FlexibleGrid', { viewportSize });
    await ghost.script(mount);
    assert.equal(await getNumColumns(), 1, 'One column of pins when not passing minCols.');
  });
});
