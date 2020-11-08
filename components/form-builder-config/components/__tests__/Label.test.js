import React from 'react';
import {Label} from '../Label';
import {mount} from 'enzyme';

describe('Check Label render', () => {
    it('Should set all initial props', () => {
        const onChange = () => {};
        const defaultValue = 'Email';
        const wrapper = mount(<Label onChange={onChange} defaultValue={defaultValue}/>);
        const input = wrapper.find('input[name="label"]');
        
        expect(input).toHaveLength(1);
        
        expect(input.prop('defaultValue')).toEqual(defaultValue);
    });
    it('It should trigger input change event', () => {
        const newValue = "User name";
        const onChange = jest.fn(e => {
            expect(e.target.name).toEqual('label');
            expect(e.target.value).toEqual(newValue);
        });
        const defaultValue = 'Email';
        const label = mount(<Label onChange={onChange} defaultValue={defaultValue}/>);
        const input = label.find('input[name="label"]');
        input.at(0).simulate('change', { target: { name: 'label', value: newValue } });
        expect(onChange).toBeCalled();
    });
    
});
