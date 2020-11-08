import React, {useMemo} from 'react';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import {FormControlLabelClasses} from './classes';


export function IsRequired({onChange, defaultChecked}) {
    const checked = useMemo(() => defaultChecked, []);
    const changeHandler = event => {
        onChange({isRequired: event.target.checked});
    };
    return (
        <div>
            <FormControlLabel
                classes={FormControlLabelClasses}
                control={
                    <Checkbox
                        defaultChecked={checked}
                        onChange={changeHandler}
                        name="isRequired"
                        inputProps={{'aria-label': 'Is required'}}
                    />
                }
                label="Is required -"
            />
        </div>
    );
}
