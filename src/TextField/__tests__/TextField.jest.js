/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
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

  it('TextField normal', () => {
    const tree = create(
      <TextField
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with error', () => {
    const tree = shallow(
      <TextField
        errorMessage="error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });
});
