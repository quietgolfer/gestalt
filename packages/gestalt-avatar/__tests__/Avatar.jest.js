/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../Avatar');

import React from 'react';
import { shallow } from 'enzyme';
import { DefaultAvatar } from '../Avatar';

describe('DefaultAvatar', () => {
  it('renders multi-byte character initials', () => {
    const avatarProps = {
      name: '💩 astral',
    };
    const wrapper = shallow(<DefaultAvatar {...avatarProps} />);
    expect(wrapper.text()).toEqual('💩');
  });

  it('renders single-byte character initials', () => {
    const avatarProps = {
      name: 'Hello!',
    };
    const wrapper = shallow(<DefaultAvatar {...avatarProps} />);
    expect(wrapper.text()).toEqual('H');
  });
});
