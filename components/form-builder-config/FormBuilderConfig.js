import React, {useContext, useMemo} from 'react';
import {FormBuilderContext} from '../../utils/context';
import cn from 'classnames';
import styles from './formBuilderConfig.module.css';
import {IsRequired} from './components/IsRequired';
import {Validation} from './components/Validation';
import {Label} from './components/Label';

const inputValidations = ['', 'email', 'phone', 'number'];
const configs = {
    'inputText': (el, onUpdate) => {
        const onChange = event => {
            onUpdate({[event.target.name]: event.target.value});
        };
        const configs = el.config || {};
        return (
            <div key={el.id}>
                <Label onChange={onChange} defaultValue={configs.label}/>
                <Validation
                    defaultValue={configs.validation}
                    canBeCustom
                    items={inputValidations}
                    onChange={onChange}
                />
                <IsRequired onChange={onUpdate}/>
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
    const config = selectedEl && configs[el.type];
    return (
        <div className={className}>
            <h2 className={styles.title}>{el?.name}</h2>
            {config && config(el, updateElementConfig)}
        </div>
    );
}
