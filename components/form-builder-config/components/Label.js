import React from 'react';
import {FormControlLabel, TextField} from '@material-ui/core';
import {FormControlLabelClasses, styles} from './classes';

export function Label({onChange, defaultValue = ''}) {
    return (
        <FormControlLabel
            classes={FormControlLabelClasses}
            control={
                <TextField
                    className={styles.inputRoot}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    name='label'
                    inputProps={{'aria-label': 'Element label'}}
                />
            }
            label={'Label - '}
        />
    );
}
