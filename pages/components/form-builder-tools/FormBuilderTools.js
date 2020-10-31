import React, {useContext} from "react";
import styles from "./formBuilderTools.module.css";
import {FormBuilderContext} from "../../../utils/context";
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

import TimerIcon from '@material-ui/icons/Timer';
import DateRangeIcon from '@material-ui/icons/DateRange';
import InputIcon from '@material-ui/icons/Input';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import RemoveIcon from '@material-ui/icons/Remove';

const componentsList = [
    {
        type: "inputText",
        name: "Text input",
        Icon: InputIcon
    },
    {
        type: "inputDate",
        name: "Date",
        Icon: DateRangeIcon
    },
    {
        type: "inputTime",
        name: "Time",
        Icon: TimerIcon
    },
    {
        type: "select",
        name: "Select dropdown",
        Icon: ArrowDropDownCircleIcon
    },
    {
        type: "checkbox",
        name: "Checkbox group",
        Icon: CheckBoxIcon
    },
    {
        type: "radioButton",
        name: "Radio buttons group",
        Icon: RadioButtonCheckedIcon
    },
    {
        type: "submit",
        name: "Submit button",
        Icon: KeyboardReturnIcon
    },
    {
        type: "clear",
        name: "Clear button",
        Icon: BackspaceSharpIcon
    },
    {
        type: "divider",
        name: "Divider",
        Icon: RemoveIcon
    }
];


export function FormBuilderTools() {
    const {addFormElement} = useContext(FormBuilderContext);

    return (
        <div className={styles.root}>
            <MenuList>
                {
                    componentsList.map(({name, Icon, type}, k) => {
                        const onClick = () => {
                            addFormElement({name, Icon, type, id: Date.now()})
                        };
                        return (
                            <MenuItem key={k} onClick={onClick} >
                                <ListItemIcon>
                                    <Icon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">{name}</Typography>
                            </MenuItem>
                        )
                    })
                }
            </MenuList>
        </div>
    );
}
