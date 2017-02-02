/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../Flyout');

import React from 'react';
import { mount, shallow } from 'enzyme';
import Flyout from '../Flyout';
import InnerFlyout from '../InnerFlyout';


describe('Flyout', () => {
  const mockTrigger = (extras = {}) => ({
    getBoundingClientRect: jest.fn(),
    contains: jest.fn(),
    ...extras,
  });

  it('does not render InnerFlyout when isOpen is false', () => {
    const wrapper = shallow(
      <Flyout
        closeLabel="close"
        isOpen={false}
        onDismiss={() => null}
        trigger={<button onClick={() => null}> test </button>}
      />
    );
    expect(wrapper.find(InnerFlyout).length).toEqual(0);
  });


  it('renders InnerFlyout when isOpen is true', () => {
    const wrapper = mount(
      <Flyout
        closeLabel="close"
        isOpen
        onDismiss={() => null}
        trigger={<button onClick={() => null}> test </button>}
      />
    );

    wrapper.instance().triggerButton = mockTrigger();
    expect(wrapper.find(InnerFlyout).length).toEqual(1);
  });
});
