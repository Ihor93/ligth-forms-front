import React, {useContext} from "react";
import {FormBuilderContext} from "../../../utils/context";
import styles from "./FormBuilderBody.module.css"
import {SortContainer} from "../sort/SortContainer";
import {SortItem} from "../sort/SortItem";

const elementRenderer = {
    'inputText': (el, k) => {
        return (
          <SortItem className={styles.inputTextRoot} key={k}>
              <div className={styles.inputTextLabel}>{el.label || el.name}</div>
              <div className={styles.inputText}/>
          </SortItem>
        );
    },
    'inputDate' : (el, k) => {
        return (
            <SortItem className={styles.inputDateRoot} key={k}>
                <div className={styles.inputDateLabel}>{el.label || el.name}</div>
                <div className={styles.inputDate}>DD/MM/YYYY</div>
            </SortItem>
        );
    },
    'inputTime' : (el, k) => {
        return (
            <SortItem className={styles.inputDateRoot} key={k}>
                <div className={styles.inputDateLabel}>{el.label || el.name}</div>
                <div className={styles.inputDate}>DD/MM/YYYY</div>
            </SortItem>
        );
    },
    'divider' : (el, k) => {
        return (
            <SortItem>
                <hr className={styles.divider} key={k}/>
            </SortItem>
        )
    }
};


export function FormBuilderBody() {
    const {formElements, selectEl} = useContext(FormBuilderContext);
    return (
        <div className={styles.root}>
            <SortContainer className={styles.container}>
                {formElements.map((el, k) => elementRenderer[el.type](el, k))}
            </SortContainer>
        </div>
    );
}
