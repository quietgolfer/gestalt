/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../GroupAvatar');

import React from 'react';
import { shallow } from 'enzyme';
import { DefaultAvatar } from '../GroupAvatar';

describe('DefaultAvatar', () => {
  it('renders multi-byte character initials', () => {
    const avatarData = {
      name: '💩 astral',
    };
    const wrapper = shallow(<DefaultAvatar data={avatarData} />);
    expect(wrapper.text()).toEqual('💩');
  });

  it('renders single-byte character initials', () => {
    const avatarData = {
      name: 'Hello!',
    };
    const wrapper = shallow(<DefaultAvatar data={avatarData} />);
    expect(wrapper.text()).toEqual('H');
  });
});
