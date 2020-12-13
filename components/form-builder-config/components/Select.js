import React from 'react';
import {FormControlLabel, MenuItem, Select as MSelect} from '@material-ui/core';
import {FormControlLabelClasses, styles} from './classes';

export function Select({onChange, label, name, items}) {
    return (
        <div>
            <FormControlLabel
                classes={FormControlLabelClasses}
                control={
                    <MSelect
                        defaultValue={""}
                        className={styles.inputRoot}
                        onChange={onChange}
                        name={name}
                    >
                        {items.map((i, k) => <MenuItem value={i}
                                                       key={i + k}>{i}</MenuItem>)}
                    </MSelect>
                }
                label={label}
            />
        </div>
    );
}
