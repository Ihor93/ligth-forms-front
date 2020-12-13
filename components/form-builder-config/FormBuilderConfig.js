import React, {useContext, useMemo} from 'react';
import {FormBuilderContext} from '../../utils/context';
import cn from 'classnames';
import styles from './formBuilderConfig.module.css';
import {ConfigItem} from './components/ConfigItem'



const inputValidations = ['', 'email', 'phone', 'number'];
const configs = {
    'inputText': (el, onUpdate, onRemove) => {
        const config = el.config || {};
        return (
            <ConfigItem
                onRemove={onRemove}
                onUpdate={onUpdate}
                config={config}
                validationItems={inputValidations}
            />
        );
    },
    'inputDate': (el, onUpdate, onRemove) => {
        const config = el.config || {};
        return (
            <ConfigItem
                onRemove={onRemove}
                onUpdate={onUpdate}
                config={config}
                validationItems={inputValidations}
            />
        );
    },
};

export function FormBuilderConfig() {
    const {formElements, updateElementConfig, selectedEl, removeFormElement} = useContext(FormBuilderContext);
    const el = useMemo(() => {
        return formElements.find(i => i.id === selectedEl);
    }, [selectedEl]);
    const className = cn(styles.root, {[styles.active]: selectedEl});
    const config = selectedEl && configs[el.type];
    const onRemove = () => removeFormElement(selectedEl);
    const onUpdate = event => {
        updateElementConfig({[event.target.name]: event.target.value});
    };
    return (
        <div className={className}>
            <h2 className={styles.title}>{el?.name}</h2>
            {config && config(el, onUpdate, onRemove)}
        </div>
    );
}
