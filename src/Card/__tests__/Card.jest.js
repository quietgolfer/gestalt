/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../../Box/Box');
jest.unmock('../../Card/Card');

import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../Card';

const snapshot = (component) => {
  const tree = renderer.create(
    component
  ).toJSON();
  expect(tree).toMatchSnapshot();
};

it('renders an empty Card', () => snapshot(<Card ariaLabel="Empty card" />));
it('renders a Card with text', () =>
  snapshot(<Card ariaLabel="Chris Lloyd - founder of Box">Chris Lloyd</Card>)
);
