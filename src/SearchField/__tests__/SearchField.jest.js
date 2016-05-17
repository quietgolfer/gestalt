/* eslint-env jest */
jest.unmock('../SearchField');

import {shallow} from 'enzyme';
import React from 'react';
import SearchField from '../SearchField';

describe('<SearchField />', () => {
    it('can be controlled', () => {
        const searchField = shallow(
            <SearchField onChange={() => {}} value="Text" />
        );
        const input = searchField.find('input');
        expect(input.prop('value')).toBe('Text');
    });

    it('can be uncontrolled', () => {
        const searchField = shallow(
            <SearchField defaultValue="DefaultText" />
        );
        const input = searchField.find('input');
        expect(input.prop('value')).toBe(undefined);
        expect(input.prop('defaultValue')).toBe('DefaultText');

        searchField.simulate('change');
        // While this assertion might seem… not useful if the component is
        // controlled, the change event will change the value of the element
        expect(input.prop('value')).toBe(undefined);
    });
});
