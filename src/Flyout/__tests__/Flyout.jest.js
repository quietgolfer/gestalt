/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../Flyout');

import React from 'react';
import { shallow } from 'enzyme';
import Flyout from '../Flyout';
import InnerFlyout from '../InnerFlyout';


describe('Flyout', () => {
  const mockTrigger = (extras = {}) => ({
    getBoundingClientRect: jest.fn(),
    contains: jest.fn(),
    ...extras,
  });

  const mockInnerFlyout = (extras = {}) => ({
    contains: jest.fn(),
    ...extras,
  });

  it('renders InnerFlyout after the trigger clicked', () => {
    const wrapper = shallow(<Flyout closeLabel="close" trigger={(onToggle => <button onClick={onToggle}> test </button>)} />);
    expect(wrapper.find(InnerFlyout).length).toEqual(0);
    expect(wrapper.instance().state.isOpen).toEqual(false);

    wrapper.instance().triggerButton = mockTrigger();

    wrapper.instance().handleTriggerClick();
    expect(wrapper.find(InnerFlyout).length).toEqual(1);
    expect(wrapper.instance().state.isOpen).toEqual(true);
  });

  it('closes an open InnerFlyout after the trigger is clicked', () => {
    const wrapper = shallow(<Flyout closeLabel="close" trigger={(onToggle => <button onClick={onToggle}> test </button>)} />);
    wrapper.instance().triggerButton = mockTrigger();
    wrapper.instance().innerFlyout = mockInnerFlyout();

    wrapper.instance().handleTriggerClick();
    expect(wrapper.instance().state.isOpen).toEqual(true);
    wrapper.instance().handleTriggerClick();
    expect(wrapper.instance().state.isOpen).toEqual(false);
  });
});
