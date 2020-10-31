import React, {useCallback, useMemo, useState} from "react";
import {FormBuilderTools} from "../form-builder-tools/FormBuilderTools";
import {FormBuilderBody} from "../form-builder-body/FormBuilderBody";
import {FormBuilderConfig} from "../form-builder-config/FormBuilderConfig";
import styles from "./formBuilder.module.css";
import {FormBuilderContext} from "../../utils/context";

export function FormBuilder() {
    const [formElements, setFormElements] = useState([]);
    const [selectedEl, setSelectedEl] = useState(null);
    const removeFormElement = useCallback((id) => {
        if (selectedEl && selectedEl.id === id) {
            setSelectedEl(null);
        }
        setFormElements(formElements.filter(i => i.id === id))
    }, [setFormElements]);
    const addFormElement = useCallback((el) => {
        setFormElements([].concat(formElements, el))
    }, [setFormElements, formElements]);
    const selectFormElement = useCallback(id => {
        setSelectedEl(id);
    }, [setSelectedEl]);
    const replaceElement = useCallback((before, elementId) => {
        const el = formElements.filter(i => i.id === elementId);
        const elements = formElements.filter(i => i.id === elementId);
        if (before) {
            const beforeIndex = elements.findIndex(i => i.id === before);
            elements.splice(beforeIndex, 0, el);
            setFormElements(elements);
        } else {
            setFormElements([...elements, el]);
        }
    }, [formElements]);
    const context = {formElements, removeFormElement, addFormElement, selectFormElement, selectedEl, replaceElement};
    return (
        <div className={styles.root}>
            <FormBuilderContext.Provider value={context}>
                <FormBuilderTools />
                <FormBuilderBody />
                <FormBuilderConfig />
            </FormBuilderContext.Provider>
        </div>
    )
}
