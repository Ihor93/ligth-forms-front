import React, {useContext, useMemo} from 'react';
import {FormBuilderContext} from '../../utils/context';
import cn from 'classnames';
import styles from './formBuilderConfig.module.css';

const configs = {
    'inputText': (el, onUpdate) => {
        const onChange = event => {
            onUpdate({[event.currentTarget.name]: event.currentTarget.value});
        };
        return (
            <div>
                <label>
                    <select name="validation" id="validation"
                            onChange={onChange}>
                        <option value="text">text</option>
                        <option value="email">email</option>
                        <option value="phone">phone</option>
                        <option value="number">number</option>
                        <option value="custom">custom</option>
                    </select>
                </label>
            </div>
        );
    },
};

export function FormBuilderConfig() {
    const {formElements, updateElementConfig, selectedEl} = useContext(
        FormBuilderContext);
    const el = useMemo(() => {
        return formElements.find(i => i.id === selectedEl);
    }, [selectedEl]);
    const className = cn(styles.root, {[styles.active]: selectedEl});
    
    return (
        <div className={className}>
            {selectedEl ? configs[el.type](el, updateElementConfig) : null}
        </div>
    );
}
