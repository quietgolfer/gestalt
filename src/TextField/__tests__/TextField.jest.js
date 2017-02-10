/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../TextField');

import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../TextField';

describe('TextField', () => {
  it('Renders an Error if one is passed in', () => {
    const wrapper = shallow(
      <TextField
        errorMessage="test"
        id="test"
        onChange={jest.fn()}
      />
    );
    expect(wrapper.find('Error').length).toEqual(1);
  });

  it('Does not render an Error when errorMessage is null', () => {
    const wrapper = shallow(
      <TextField
        id="test"
        onChange={jest.fn()}
      />
    );
    expect(wrapper.find('Error').length).toEqual(0);
  });
});
