/* eslint-env jest */
jest.unmock('../TextField');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import TextField from '../TextField';

describe('<TextField />', () => {
    it('is controlled', () => {
        const textField = TestUtils.renderIntoDocument(
            <TextField value="Text" />
        );
        expect(textField.getValue()).toBe('Text');
    });

    it('is uncontrolled', () => {
        const textField = TestUtils.renderIntoDocument(
            <TextField />
        );
        const el = ReactDOM.findDOMNode(textField);
        el.value = 'Text';
        TestUtils.Simulate.change(el);
        // While this assertion might seem… not useful if the component is
        // controlled, the change event will change the value of the element
        expect(el.value).toBe('Text');
    });

    it('is focusable', () => {
        const textField = TestUtils.renderIntoDocument(
            <TextField focused />
        );
        const el = ReactDOM.findDOMNode(textField);
        expect(document.activeElement).toBe(el);
    });

    it('validates input', () => {
        let errors = false;
        const textField = TestUtils.renderIntoDocument(
            <TextField
                onValidation={() => errors = true}
                validators={[() => ({errors: ['error']})]} />
        );
        const el = ReactDOM.findDOMNode(textField);
        expect(!errors);
        expect(el.className).toBe('');
        textField.text = 'Text';
        TestUtils.Simulate.change(el);
        expect(errors);
    });

    it('triggers onChange callback', () => {
        let changed = false;
        const textField = TestUtils.renderIntoDocument(
            <TextField onChange={() => changed = true} />
        );
        const el = ReactDOM.findDOMNode(textField);
        TestUtils.Simulate.change(el);
        expect(changed);
    });

    it('getId returns the id passed in as a prop', () => {
        const textField = TestUtils.renderIntoDocument(
            <TextField id="TextField 123" />
        );
        expect(textField.getId()).toBe("TextField 123");
    });
});
