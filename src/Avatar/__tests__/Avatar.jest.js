/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../Avatar');
jest.unmock('../../Box/Box');
jest.unmock('../../Image/Image');
jest.unmock('../../Mask/Mask');

import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from '../Avatar';

test('Avatar renders multibyte names', () => {
  const component = renderer.create(
    <Avatar name="💩 astral" />,
    {
      createNodeMock() {
        return { clientWidth: 100 };
      },
    }
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
