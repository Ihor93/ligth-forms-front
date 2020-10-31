import React, {useRef, useState} from "react";
import styles from './sort.module.css'

export function SortItem({id, children, ...props}) {
    const [hold, setHold] = useState(false);
    const [style, setStyle] = useState(undefined);
    const ref = useRef();
    let interval;
    const onMouseDown = () => {
        interval = setTimeout(() => {
            setHold(true);
        }, 100)
    };
    const onMouseUp = () => {
        clearTimeout(interval);
        if (hold) {
            setHold(false);
            ref.current.style
        }
    };
    const onMouseMove = e => {
        if (hold && ref.current) {
            ref.current.style = `left: ${e.clientX}px; top: ${e.clientY}px;`
        }
    };
    const className = hold ? styles.dragAreaHold : '';
    return (
        <div onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} {...props} data-id={id}>
            {hold && <div className={styles.hold}/>}
            <div style={style} className={className} ref={ref}>
                {children}
            </div>
        </div>
    )
}
