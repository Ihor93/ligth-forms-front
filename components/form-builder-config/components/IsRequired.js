import React from 'react';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import {FormControlLabelClasses} from './classes';


export function IsRequired({onChange}) {
    const changeHandler = event => {
        onChange({isRequired: event.target.checked});
    };
    return (
        <div>
            <FormControlLabel
                classes={FormControlLabelClasses}
                control={
                    <Checkbox
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
