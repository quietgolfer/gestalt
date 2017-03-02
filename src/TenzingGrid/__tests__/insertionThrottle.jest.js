/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../ThrottleInsertion');

import React from 'react';
import { shallow } from 'enzyme';
import ThrottleInsertion from '../ThrottleInsertion';

const TestComponent = () => <div />;

const WrappedComponent = ThrottleInsertion(() => ({}), TestComponent);

describe('ThrottleInsertion', () => {
  it('throttles insertion of iems', () => {
    jest.useFakeTimers();
    const items = [1, 2, 3];
    const wrapper = shallow(<WrappedComponent items={items} />);
    expect(wrapper.get(0).props.items.length).toEqual(3);

    wrapper.setProps({
      items: [...items, 4, 5]
    });

    // Items should not increase until we run timers.
    expect(wrapper.get(0).props.items.length).toEqual(3);
    expect(wrapper.get(0).props.insertionsQueued).toEqual(true);

    // Items should increase after each timer.
    wrapper.instance().componentWillReceiveProps();
    jest.runOnlyPendingTimers();
    expect(wrapper.get(0).props.items.length).toEqual(4);
    jest.runOnlyPendingTimers();
    expect(wrapper.get(0).props.items.length).toEqual(5);
    jest.runOnlyPendingTimers();

    // There are no more pending items.
    expect(wrapper.get(0).props.items.length).toEqual(5);
    expect(wrapper.get(0).props.insertionsQueued).toEqual(false);
  });
});
