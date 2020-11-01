import React, {useContext} from "react";
import {FormBuilderContext} from "../../utils/context";
import styles from "./FormBuilderBody.module.css"
import {SortContainer} from "../sort/SortContainer";

const elementRenderer = {
    'inputText': (el, k) => {
        return (
            <div className={styles.inputTextRoot} key={k}>
                <div className={styles.inputTextLabel}>{el.label || el.name}</div>
                <div className={styles.inputText}/>
            </div>
        );
    },
    'inputDate': (el, k) => {
        return (
            <div className={styles.inputDateRoot} key={k}>
                <div className={styles.inputDateLabel}>{el.label || el.name}</div>
                <div className={styles.inputDate}>DD/MM/YYYY</div>
            </div>
        );
    },
    'inputTime': (el, k) => {
        return (
            <div className={styles.inputDateRoot} key={k}>
                <div className={styles.inputDateLabel}>{el.label || el.name}</div>
                <div className={styles.inputDate}>DD/MM/YYYY</div>
            </div>
        );
    },
    'divider': (el, k) => {
        return (
            <hr className={styles.divider} key={k}/>
        )
    }
};


export function FormBuilderBody() {
    const {formElements, selectFormElement, replaceElement, selectedEl} = useContext(FormBuilderContext);
    const onSort = (before, id) => {
      replaceElement(+before, +id);
      console.log(before, id);
    };
    return (
        <div className={styles.root}>
            <SortContainer
                className={styles.container}
                onSort={onSort}
                onSelect={selectFormElement}
                selectedEl={selectedEl}
                items={formElements.map((el, k) => {
                    return {
                        ...el,
                        children: elementRenderer[el.type](el, k)
                    }
                })}/>
        </div>
    );
}
