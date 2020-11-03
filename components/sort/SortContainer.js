import React, {useMemo, useRef, useState} from 'react';
import styles from './sort.module.css';
import cn from 'classnames';
import {IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function renderSortItem({id, children}, selectedEl, onItemMouseEnter, onItemMouseLeave, onItemMouseUp, removeFormElement) {
    const active = id === selectedEl;
    return (
        <div
            className={cn(styles.sortItem, active && styles.sortItemActive)}
            key={id} data-sort-item={id} onMouseEnter={onItemMouseEnter}
            onMouseUp={onItemMouseUp} onMouseLeave={onItemMouseLeave}>
            <div className={styles.holdItem}>{children}</div>
            <div className={styles.dragArea}>
                {children}
            </div>
            {active && (
                <IconButton aria-label="delete" className={styles.deleteIcon} onClick={() => removeFormElement(id)}>
                    <DeleteIcon />
                </IconButton>
            )}
        </div>
    );
}

export function SortContainer({items, onSort, onSelect, selectedEl, removeFormElement, ...props}) {
    const [hold, setHold] = useState(false);
    /**
     *
     * @type {React.MutableRefObject<HTMLDivElement>}
     */
    const ref = useRef();
    const intervalRef = useRef();
    
    const onMouseDown = (event) => {
        const target = event.target;
        const item = target && target.closest('[data-sort-item]');
        if (!item) return;
        onSelect(+item.dataset.sortItem);
        intervalRef.current = setTimeout(() => {
            const clientY = event.clientY;
            if (item) {
                ref.current = item.querySelector('.' + styles.dragArea);
                const prev = ref.current.previousElementSibling;
                const {width, height} = ref.current.getBoundingClientRect();
                prev.classList.add(styles.hold);
                prev.style = `width: ${width}px; height: ${height}px;`;
                setHold(true);
                item.classList.add(styles.sortItemMoving);
                ref.current.style = `position: absolute; top: ${clientY + window.scrollY + 3}px;width: ${width}px`;
            }
        }, 300);
    };
    const onMouseUp = () => {
        clearTimeout(intervalRef.current);
        if (hold) {
            setHold(false);
            ref.current.style = undefined;
            const prev = ref.current.previousElementSibling;
            ref.current.parentElement.classList.remove(styles.sortItemMoving);
            prev.classList.remove(styles.hold);
        }
    };
    const onMouseMove = e => {
        if (hold && ref.current) {
            const {width} = ref.current.getBoundingClientRect();
            ref.current.style = `position: absolute; top: ${e.clientY + window.scrollY + 3}px;width: ${width}px`;
        }
    };
    const onItemMouseEnter = (e) => {
        if (hold) {
            e.currentTarget.classList.add(styles.over);
        }
    };
    const onItemMouseLeave = (e) => {
        e.currentTarget.classList.remove(styles.over);
    };
    const onItemMouseUp = (e) => {
        if (hold) {
            const item = e.target.closest('.' + styles.sortItem);
            if (item) {
                onSort(item.dataset.sortItem,
                    ref.current.parentElement.dataset.sortItem);
            }
        }
        onItemMouseLeave(e);
    };
    const classNames = cn(props.className, {[styles.sortContainerMoving]: hold},
        styles.sortContainer);
    
    const [buttons, elements] = useMemo(() => {
        return items.reduce((res, now) => {
            if (now.type === 'clear' || now.type === 'submit') {
                res[0].push(now);
            } else {
                res[1].push(now);
            }
            return res;
        }, [[], []]);
    }, [items]);
    return (
        <div className={classNames} onMouseMove={onMouseMove}
             onMouseDown={onMouseDown} onMouseUp={onMouseUp}
             onMouseLeave={onMouseUp}>
            {elements.map(i => renderSortItem(i, selectedEl, onItemMouseEnter, onItemMouseLeave, onItemMouseUp, removeFormElement))}
            {buttons.map(i => renderSortItem(i, selectedEl, onItemMouseEnter, onItemMouseLeave, onItemMouseUp, removeFormElement))}
            <div
                className={cn(styles.sortItem, styles.lastItem)}
                onMouseEnter={onItemMouseEnter}
                onMouseUp={onItemMouseUp}
                onMouseLeave={onItemMouseLeave}>
            </div>
        </div>
    );
}
