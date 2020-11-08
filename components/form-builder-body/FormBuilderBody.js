import React, {useContext} from "react";
import {FormBuilderContext} from "../../utils/context";
import styles from "./FormBuilderBody.module.css"
import {SortContainer} from "../sort/SortContainer";

const elementRenderer = {
    'inputText': (el, k) => {
        return (
            <div className={styles.inputTextRoot} key={k}>
                <div className={styles.inputTextLabel}>{el?.config.label || el.name}</div>
                <div className={styles.inputText}/>
            </div>
        );
    },
    'inputDate': (el, k) => {
        return (
            <div className={styles.inputDateRoot} key={k}>
                <div className={styles.inputDateLabel}>{el?.config.label || el.name}</div>
                <div className={styles.inputDate}>DD/MM/YYYY</div>
            </div>
        );
    },
    'inputTime': (el, k) => {
        return (
            <div className={styles.inputDateRoot} key={k}>
                <div className={styles.inputDateLabel}>{el?.config.label || el.name}</div>
                <div className={styles.inputDate}>HH:MM:SS</div>
            </div>
        );
    },
    'divider': (el, k) => {
        return (
            <hr className={styles.divider} key={k}/>
        )
    },
    'select' : (el, k) => {
        return (
            <div className={styles.inputDateRoot} key={k}>
                <div className={styles.inputDateLabel}>{el?.config.label || el.name}</div>
                <div className={styles.inputDate}>icon</div>
            </div>
        )
    },
    'checkbox' : (el, k) => {
        return (
            <div key={k}>
                <h3>{el?.config.label || el.name}</h3>
                {el.config.items.map((i, k) => {
                    return (
                        <div key={k + i}>icon - {i}</div>
                    )
                })}
            </div>
        )
    },
    'radioButton' : (el, k) => {
        return (
            <div key={k}>
                <h3>{el?.config.label || el.name}</h3>
                {el.config.items.map((i, k) => {
                    return (
                        <div key={k + i}>icon - {i}</div>
                    )
                })}
            </div>
        )
    },
    'submit' : (el, k) => {
        return (
            <div key={k}>
                <button className={styles.button}>submit</button>
            </div>
        )
    },
    'clear' : (el, k) => {
        return (
            <div key={k}>
                <button className={styles.button}>clear</button>
            </div>
        )
    },
};


export function FormBuilderBody() {
    const {formElements, selectFormElement, replaceElement, selectedEl, removeFormElement} = useContext(FormBuilderContext);
    const onSort = (before, id) => {
      replaceElement(+before, +id);
    };
    return (
        <div className={styles.root}>
            <SortContainer
                className={styles.container}
                onSort={onSort}
                onSelect={selectFormElement}
                selectedEl={selectedEl}
                removeFormElement={removeFormElement}
                items={formElements.map((el, k) => {
                    return {
                        ...el,
                        children: elementRenderer[el.type](el, k)
                    }
                })}/>
        </div>
    );
}
