/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import TextField from '../TextField';

describe('TextField', () => {
  it('Renders an ErrorFlyout if one is passed in', () => {
    const wrapper = shallow(
      <TextField
        errorMessage="test"
        id="test"
        onChange={jest.fn()}
      />
    );
    expect(wrapper.find('ErrorFlyout').length).toEqual(1);
  });

  it('Does not render an ErrorFlyout when errorMessage is null', () => {
    const wrapper = shallow(
      <TextField
        id="test"
        onChange={jest.fn()}
      />
    );
    expect(wrapper.find('ErrorFlyout').length).toEqual(0);
  });
});
