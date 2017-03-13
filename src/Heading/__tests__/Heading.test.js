/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import Heading from '../Heading';

test('Heading small', () => {
  const tree = create(
    <Heading size="sm" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Heading xsmall with level 3', () => {
  const tree = create(
    <Heading size="xs" accessibilityLevel={3} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
