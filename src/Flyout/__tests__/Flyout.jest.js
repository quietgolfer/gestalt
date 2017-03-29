/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Flyout from '../Flyout';

describe('Regular & Mobile version display checks', () => {
  it('Renders Controller if breakpoint is larger than xs', () => {
    const wrapper = shallow(
      <Flyout
        accessibilityCloseLabel="close"
        idealDirection="down"
        isOpen={false}
        onDismiss={jest.fn()}
        size="sm"
        trigger={<button onClick={() => null}> test </button>}
      />
    );
    wrapper.instance().setState({ breakpoint: 'sm' });
    expect(wrapper.find('Controller').length).toEqual(1);
    expect(wrapper.find('MobileFlyout').length).toEqual(0);
    wrapper.instance().setState({ breakpoint: 'md' });
    expect(wrapper.find('Controller').length).toEqual(1);
    expect(wrapper.find('MobileFlyout').length).toEqual(0);
    wrapper.instance().setState({ breakpoint: 'lg' });
    expect(wrapper.find('Controller').length).toEqual(1);
    expect(wrapper.find('MobileFlyout').length).toEqual(0);
  });

  it('Renders MobileFlyout if breakpoint is xs', () => {
    const wrapper = shallow(
      <Flyout
        accessibilityCloseLabel="close"
        idealDirection="down"
        isOpen={false}
        onDismiss={jest.fn()}
        size="sm"
        trigger={<button onClick={() => null}> test </button>}
      />
    );
    wrapper.instance().setState({ breakpoint: 'xs' });
    expect(wrapper.find('Controller').length).toEqual(0);
    expect(wrapper.find('MobileFlyout').length).toEqual(1);
  });
});
