/* eslint-env jest */
jest.unmock('../TextField');

import { shallow } from 'enzyme';
import React from 'react';
import TextField from '../TextField';

describe('<TextField />', () => {
  it('can be controlled', () => {
    const textField = shallow(
      <TextField onChange={() => {}} value="Text" />
    );
    expect(textField.prop('value')).toBe('Text');
  });

  it('can be uncontrolled', () => {
    const textField = shallow(
      <TextField defaultValue="DefaultText" />
    );
    const input = textField.find('input');
    expect(input.prop('value')).toBe(undefined);
    expect(input.prop('defaultValue')).toBe('DefaultText');

    input.simulate('change');
    // While this assertion might seem not useful if the component is
    // controlled, the change event will change the value of the element
    expect(input.prop('value')).toBe(undefined);
  });
});
