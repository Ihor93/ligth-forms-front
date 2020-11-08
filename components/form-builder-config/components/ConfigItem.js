import React from 'react';
import styles from '../formBuilderConfig.module.css';
import {Button} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import {IsRequired} from './IsRequired';
import {Validation} from './Validation';
import {Label} from './Label';

export const ConfigItem = ({config, onRemove, onUpdate, validationItems, children}) => {
    return (
        <div className={styles.configBody}>
            <Label onChange={onUpdate} defaultValue={config.label}/>
            <Validation
                defaultValue={config.validation}
                canBeCustom
                items={validationItems}
                onChange={onUpdate}
            />
            <IsRequired onChange={onUpdate} defaultChecked={config.isRequired}/>
            {children}
            <div className={styles.btnSection}>
                <Button
                    onClick={onRemove}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon/>}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};
