/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../Controller');

import React from 'react';
import { shallow } from 'enzyme';
import Controller from '../Controller';
import Contents from '../Contents';


describe('Flyout', () => {
  it('does not render Contents when isOpen is false', () => {
    const wrapper = shallow(
      <Controller
        accessibilityCloseLabel="close"
        isOpen={false}
        onDismiss={() => null}
        trigger={<button onClick={() => null}> test </button>}
      />
    );
    expect(wrapper.find(Contents).length).toEqual(0);
  });
});
