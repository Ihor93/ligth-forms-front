import React, {useState, useMemo} from 'react';
import {FormControlLabel, MenuItem, Select, TextField } from '@material-ui/core';
import {FormControlLabelClasses, styles} from './classes';

let id;

export function Validation({onChange, items, canBeCustom = false, defaultValue}) {
    const defValue = useMemo(() => defaultValue && defaultValue.hasOwnProperty('custom') && 'custom' || defaultValue || '', []);
    const [custom, setCustom] = useState(defValue === 'custom');
    const [customValue, setCustomValue] = useState(defaultValue ? defaultValue.custom || '' : '');
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
            <FormControlLabel
                classes={FormControlLabelClasses}
                control={
                    <Select
                        className={styles.inputRoot}
                        displayEmpty
                        onChange={handleChange}
                        name='validation'
                        defaultValue={defValue}
                        inputProps={{'aria-label': "Validation"}}
                    >
                        {items.map((i, k) => <MenuItem value={i}
                                                       key={i + k}>{i}</MenuItem>)}
                        {canBeCustom && <MenuItem value="custom">custom</MenuItem>}
                    </Select>
                }
                label="Validation - "
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
