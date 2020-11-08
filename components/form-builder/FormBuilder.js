import React, {useCallback, useState} from 'react';
import {FormBuilderTools} from '../form-builder-tools/FormBuilderTools';
import {FormBuilderBody} from '../form-builder-body/FormBuilderBody';
import {FormBuilderConfig} from '../form-builder-config/FormBuilderConfig';
import styles from './formBuilder.module.css';
import {FormBuilderContext} from '../../utils/context';

export function FormBuilder() {
    const [formElements, setFormElements] = useState([]);
    const [selectedEl, setSelectedEl] = useState(null);
    const removeFormElement = useCallback((id) => {
        if (selectedEl && selectedEl === id) {
            setSelectedEl(null);
        }
        setFormElements(formElements.filter(i => i.id !== id));
    }, [setFormElements, formElements, selectedEl]);
    const addFormElement = useCallback((el) => {
        if (el.unique && formElements.find(i => i.type === el.type)) {
            alert('This element can be only one');
            return;
        }
        setFormElements([].concat(formElements, el));
    }, [setFormElements, formElements]);
    const selectFormElement = useCallback(id => {
        setSelectedEl(id);
    }, [setSelectedEl]);
    const replaceElement = useCallback((before, elementId) => {
        const el = formElements.find(i => i.id === elementId);
        const elements = formElements.filter(i => i.id !== elementId);
        let res;
        if (before) {
            const beforeIndex = elements.findIndex(i => i.id === before);
            elements.splice(beforeIndex, 0, el);
            res = elements;
        } else {
            res = [...elements, el];
        }
        setFormElements(res);
    }, [formElements]);
    const updateElementConfig = (configs) => {
        const element = formElements.find(i => i.id === selectedEl);
        element.config = {...element.config, ...configs};
        setFormElements([...formElements]);
    };
    const context = {formElements, removeFormElement, addFormElement, selectFormElement, selectedEl, replaceElement, updateElementConfig};
    return (
        <div className={styles.root}>
            <FormBuilderContext.Provider value={context}>
                <FormBuilderTools/>
                <FormBuilderBody/>
                <FormBuilderConfig/>
            </FormBuilderContext.Provider>
        </div>
    );
}
