/* eslint-env jest */
import React from 'react';
import renderer from 'react-test-renderer';
import Image from '../Image';

test('Image matches snapshot', () => {
  const component = renderer.create(
    <Image alt="foo" src="foo.png" width={50} height={50} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Image with overlay matches snapshot', () => {
  const component = renderer.create(
    <Image alt="foo" src="foo.png" width={50} height={50}>
      Foo.png
    </Image>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
