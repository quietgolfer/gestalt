/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const a11yError = a11yResults => `
    A11Y Violations:
    ${JSON.stringify(a11yResults.violations, null, 4)}`;

describe('Icon > a11y', () => {
  it('Loads at least 5 icons on the test page', async () => {
    await ghost.injectScripts('node_modules/axe-core/axe.js');
    await ghost.open('http://localhost:3000/a11y/icon');

    const svgIcons = await ghost.findElements('svg');
    assert.ok(svgIcons.length >= 5);
  });

  it('Does not have any a11y issues', async () => {
    await ghost.script(() => {
      window.axe.a11yCheck(document, (results) => {
        window.A11YRESULTS = results;
      });
    });

    const a11yResults = await ghost.wait(async () =>
      await ghost.script(() => window.A11YRESULTS)
    );

    assert(a11yResults.violations.length === 0, a11yError(a11yResults));
  });
});
