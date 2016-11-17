/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../stringToColor');
import stringToColor from '../stringToColor';

const expectedReturns = {
  '': '#efefef',
  Chris: '#ceaba1',
  Julia: '#a9ba95',
  Kevin: '#a9ba97',
  'Chris Lloyd': '#a5bbc2',
  'Shrimp!': '#e6a299',
  'Web Dev': '#b4cad0',
};

describe('stringToColor', () => {
  it('always returns the same color for a specific string', () => {
    Object.keys(expectedReturns).forEach((input) => {
      const color = expectedReturns[input];
      const returnColor = stringToColor(input);
      expect(returnColor).toEqual(color);
    });
  });
});
