/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../../Link/Link');

import React from 'react';
import renderer from 'react-test-renderer';
import Link from '../Link';

const snapshot = (component) => {
  const tree = renderer.create(
    component
  ).toJSON();
  expect(tree).toMatchSnapshot();
};

it('default', () => snapshot(<Link href="https://example.com">Link</Link>));
it('gray', () =>
  snapshot(<Link href="https://example.com" color="gray">Link</Link>)
);
it('gray inline', () =>
  snapshot(<Link href="https://example.com" color="gray" inline>Link</Link>)
);
it('darkGray', () =>
  snapshot(<Link href="https://example.com" color="darkGray">Link</Link>)
);
it('darkGray inline', () =>
  snapshot(<Link href="https://example.com" color="darkGray" inline>Link</Link>)
);
it('white', () =>
  snapshot(<Link href="https://example.com" color="white">Link</Link>)
);
it('white inline', () =>
  snapshot(<Link href="https://example.com" color="white" inline>Link</Link>)
);
it('red', () =>
  snapshot(<Link href="https://example.com" color="red">Link</Link>)
);
it('red inline', () =>
  snapshot(<Link href="https://example.com" color="red" inline>Link</Link>)
);
it('blue', () =>
  snapshot(<Link href="https://example.com" color="blue">Link</Link>)
);
it('blue inline', () =>
  snapshot(<Link href="https://example.com" color="blue" inline>Link</Link>)
);
