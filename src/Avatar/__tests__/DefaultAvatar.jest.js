/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../DefaultAvatar');
jest.unmock('../../Mask/Mask');

import React from 'react';
import { shallow } from 'enzyme';
import DefaultAvatar from '../DefaultAvatar';
import Mask from '../../Mask/Mask';

describe('DefaultAvatar', () => {
  it('renders multi-byte character initials', () => {
    const avatarProps = {
      name: '💩 astral',
    };
    const wrapper = shallow(<DefaultAvatar {...avatarProps} />);
    const withMask = wrapper.find(Mask).shallow();
    expect(withMask.text()).toEqual('💩');
  });

  it('renders single-byte character initials', () => {
    const avatarProps = {
      name: 'Hello!',
    };
    const wrapper = shallow(<DefaultAvatar {...avatarProps} />);
    const withMask = wrapper.find(Mask).shallow();
    expect(withMask.text()).toEqual('H');
  });
});
