/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import MobileFlyout from '../MobileFlyout';


describe('MobileFlyout', () => {
  it('does not render contents when isOpen is false', () => {
    const wrapper = shallow(
      <MobileFlyout
        accessibilityCloseLabel="close"
        isOpen={false}
        onDismiss={() => null}
        trigger={<button onClick={() => null}> test </button>}
      />
    );
    expect(wrapper.find('IconButton').length).toEqual(0);
  });


  it('renders contents when isOpen is true', () => {
    const wrapper = shallow(
      <MobileFlyout
        accessibilityCloseLabel="close"
        isOpen
        onDismiss={() => null}
        trigger={<button onClick={() => null}> test </button>}
      />
    );

    expect(wrapper.find('IconButton').length).toEqual(1);
  });
});
