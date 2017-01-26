/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import Box from '../Box';

jest.unmock('../Box');

test('Box renders', () => {
  const tree = create(
    <Box />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
