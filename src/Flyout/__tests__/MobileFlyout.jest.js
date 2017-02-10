/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../MobileFlyout');

import React from 'react';
import { shallow } from 'enzyme';
import MobileFlyout from '../MobileFlyout';


describe('MobileFlyout', () => {
  it('does not render contents when isOpen is false', () => {
    const wrapper = shallow(
      <MobileFlyout
        closeLabel="close"
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
        closeLabel="close"
        isOpen
        onDismiss={() => null}
        trigger={<button onClick={() => null}> test </button>}
      />
    );

    expect(wrapper.find('IconButton').length).toEqual(1);
  });
});
