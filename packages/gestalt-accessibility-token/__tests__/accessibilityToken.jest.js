/* global describe */
/* global expect */
/* global jest */
/* global it */

/* eslint import/imports-first: 0 */
jest.unmock('../accessibilityToken');

import accessibilityToken from '../accessibilityToken';

describe('accessibilityToken', () => {
  it('has a default of id_number', () => {
    const output = accessibilityToken();

    expect(output).toEqual('id_1');
  });

  it('takes in a prefix string', () => {
    const output = accessibilityToken('icon_');

    expect(output).toEqual('icon_2');
  });

  it('keeps incrementing with every new call', () => {
    const output1 = accessibilityToken('shrimp_');
    const output2 = accessibilityToken('shrimp_');
    const output3 = accessibilityToken('shrimp_');

    expect(output1).toEqual('shrimp_3');
    expect(output2).toEqual('shrimp_4');
    expect(output3).toEqual('shrimp_5');
  });
});
