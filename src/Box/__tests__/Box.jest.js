/* eslint-env jest */
import React from 'react';
import { create } from 'react-test-renderer';
import Box from '../Box';

test('Box renders', () => {
  const tree = create(
    <Box />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box has correct *-hide classes when display is false', () => {
  const tree = create(
    <Box
      xs={{ display: false }}
      sm={{ display: false }}
      md={{ display: false }}
      lg={{ display: false }}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box has correct *-flex classes when display is flex', () => {
  const tree = create(
    <Box
      xs={{ display: 'flex' }}
      sm={{ display: 'flex' }}
      md={{ display: 'flex' }}
      lg={{ display: 'flex' }}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box has correct *-flex-column classes when display is flexColumn', () => {
  const tree = create(
    <Box
      xs={{ display: 'flexColumn' }}
      sm={{ display: 'flexColumn' }}
      md={{ display: 'flexColumn' }}
      lg={{ display: 'flexColumn' }}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Box has correct *-inline-block classes when display is inlineBlock', () => {
  const tree = create(
    <Box
      xs={{ display: 'inlineBlock' }}
      sm={{ display: 'inlineBlock' }}
      md={{ display: 'inlineBlock' }}
      lg={{ display: 'inlineBlock' }}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
