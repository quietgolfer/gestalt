/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../TextArea');

import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import TextArea from '../TextArea';

describe('TextField', () => {
  it('Renders an ErrorFlyout if one is passed in', () => {
    const wrapper = shallow(
      <TextArea
        errorMessage="test"
        id="test"
        onChange={jest.fn()}
      />
    );
    expect(wrapper.find('ErrorFlyout').length).toEqual(1);
  });

  it('Does not render an ErrorFlyout when errorMessage is null', () => {
    const wrapper = shallow(
      <TextArea
        id="test"
        onChange={jest.fn()}
      />
    );
    expect(wrapper.find('ErrorFlyout').length).toEqual(0);
  });

  it('TextArea normal', () => {
    const tree = create(
      <TextArea
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with error', () => {
    const tree = shallow(
      <TextArea
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
