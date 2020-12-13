import React, {useState, useMemo} from 'react';
import {FormControlLabel, MenuItem, TextField } from '@material-ui/core';
import {FormControlLabelClasses, styles} from './classes';
import { Select } from "./Select"

let id;

export function Validation({onChange, items, canBeCustom = false, defaultValue}) {
    const defValue = useMemo(() => defaultValue && defaultValue.hasOwnProperty('custom') && 'custom' || defaultValue || '', []);
    const [custom, setCustom] = useState(defValue === 'custom');
    const [customValue, setCustomValue] = useState(defaultValue ? defaultValue.custom || '' : '');
    const validationItems = useMemo(() => {
        if (canBeCustom) {
            items.push('custom')
        }
        return items;
    }, [items])
    const handleChange = (event) => {
      if (event.target.value === 'custom') {
          setCustom(true);
          onChange({target: {name: 'validation',value: {custom: customValue}}})
      } else {
          custom && setCustom(false);
          onChange(event)
      }
    };
    const customHandleChange = event => {
        clearTimeout(id);
        const value = event.target.value;
        setCustomValue(value);
        id = setTimeout(() => {
            onChange({target: {name: 'validation',value: {custom: value}}})
        }, 300);
    };

    return (
        <div>
            <Select
                items={validationItems}
                label="Validation - "
                name="validation"
                onChange={handleChange}
            />
            {
                custom && (
                    <FormControlLabel
                        classes={FormControlLabelClasses}
                        control={
                            <TextField
                                className={styles.inputRoot}
                                value={customValue}
                                onChange={customHandleChange}
                                name='custom'
                                inputProps={{'aria-label': 'Custom validation'}}
                            />
                        }
                        label={'RegExp - '}
                    />
                )
            }
        </div>
    )
}
