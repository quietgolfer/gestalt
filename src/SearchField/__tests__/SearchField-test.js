/* eslint-env jest */
jest.unmock('../TextField');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SearchField from '../SearchField';

describe('<SearchField />', () => {
    it('can be controlled', () => {
        const textField = TestUtils.renderIntoDocument(
            <SearchField onChange={() => {}} value="Text" />
        );
        expect(textField.value).toBe('Text');
    });

    it('can be uncontrolled', () => {
        const textField = TestUtils.renderIntoDocument(
            <SearchField defaultValue="DefaultText" />
        );
        const el = ReactDOM.findDOMNode(textField);
        el.value = 'Text';
        TestUtils.Simulate.change(el);
        // While this assertion might seem… not useful if the component is
        // controlled, the change event will change the value of the element
        expect(el.value).toBe('Text');
    });
});
