/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../Card';

const snapshot = (component) => {
  const tree = renderer.create(
    component
  ).toJSON();
  expect(tree).toMatchSnapshot();
};

it('renders an empty Card', () => snapshot(<Card accessibilityLabel="Empty card" />));
it('renders a Card with text', () =>
  snapshot(<Card accessibilityLabel="Chris Lloyd - founder of Box">Chris Lloyd</Card>)
);
