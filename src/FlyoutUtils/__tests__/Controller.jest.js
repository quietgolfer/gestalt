/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../Controller');

import React from 'react';
import { mount, shallow } from 'enzyme';
import Controller from '../Controller';
import Contents from '../Contents';


describe('Controller', () => {
  const mockTrigger = (extras = {}) => ({
    getBoundingClientRect: jest.fn(),
    contains: jest.fn(),
    ...extras,
  });

  it('does not render Contents when isOpen is false', () => {
    const wrapper = shallow(
      <Controller
        closeLabel="close"
        isOpen={false}
        onDismiss={() => null}
        trigger={<button onClick={() => null}> test </button>}
      />
    );
    expect(wrapper.find(Contents).length).toEqual(0);
  });


  it('renders Contents when isOpen is true', () => {
    const wrapper = mount(
      <Controller
        closeLabel="close"
        isOpen
        onDismiss={() => null}
        trigger={<button onClick={() => null}> test </button>}
      />
    );

    wrapper.instance().triggerButton = mockTrigger();
    expect(wrapper.find(Contents).length).toEqual(1);
  });
});
