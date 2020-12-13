import React from 'react';
import {Select} from '../Select';
import {mount} from 'enzyme';
import {Select as MuSelect} from "@material-ui/core"

const mockProps = {
    onChange: jest.fn(),
    items: ["value 1", "value 2", "value 3"],
    name: "test select",
    label: "test select label"
}

describe('Check Select', () => {
    const select = mount(<Select {...mockProps}/>);
    const input = select.find(`input[name='${mockProps.name}']`);
    it('Should set all initial props', () => {
        const label = select.find('span.MuiFormControlLabel-label');
        expect(input).toHaveLength(1);
        expect(label.text()).toBe(mockProps.label);

        const muItems = select.find(MuSelect).prop('children')

        expect(muItems).toHaveLength(3);
    });
    it('It should call change handler', () => {
        const newValue = "value 2"
        const mockEvent = {target: {name: mockProps.name, value: newValue}};
        input.at(0).simulate('change', mockEvent);
        expect(mockProps.onChange).toBeCalledWith(expect.objectContaining({
            target: expect.objectContaining({
                name: expect.stringContaining(mockProps.name),
                value: expect.stringContaining(newValue)
            })
        }), expect.anything());
    });

});
