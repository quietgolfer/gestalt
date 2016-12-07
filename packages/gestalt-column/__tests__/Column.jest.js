/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../Column');

import React from 'react';
import renderer from 'react-test-renderer';
import Column from '../Column';

test('Column matches snapshot', () => {
  const component = renderer.create(
    <Column xs={1}>Hello world</Column>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
