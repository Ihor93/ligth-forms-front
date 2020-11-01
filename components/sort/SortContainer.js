import React, {useRef, useState} from "react";
import styles from './sort.module.css'

function renderSortItem({id, children, ...props}) {
    return (
        <div key={id} data-sort-item={id}>
            <div className={styles.hold}/>
            <div className="dragArea">
                {children}
            </div>
        </div>
    )
}


export function SortContainer({items, onSort, ...props}) {
    const [hold, setHold] = useState(false);
    const [space, setSpace] = useState(0);
    /**
     *
     * @type {React.MutableRefObject<HTMLDivElement>}
     */
    const ref = useRef();
    let interval;
    const onMouseDown = (event) => {
        const target = event.target;
        interval = setTimeout(() => {
            const item = target && target.closest('[data-sort-item]');
            const clientY = event.clientY;
            if (item) {
                ref.current = item.querySelector(".dragArea");
                const prev = ref.current.previousElementSibling;
                prev.classList.add("hold");
                const {width, height, top} = ref.current.getBoundingClientRect();
                setSpace(clientY - top);
                prev.style = `width: ${width}px; height: ${height}px;`;
                setHold(true);
            }
        }, 200)
    };
    const onMouseUp = () => {
        clearTimeout(interval);
        if (hold) {
            setHold(false);
            ref.current.style = "";
            const prev = ref.current.previousElementSibling;
            prev.classList.remove("hold");
        }
    };
    const onMouseMove = e => {
        if (hold && ref.current) {
            const {width} = ref.current.getBoundingClientRect();
            ref.current.style = `position: absolute; top: ${e.clientY + space}px;width: ${width}px`
        }
    };

    return (
       <div className={props.className} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} >
           {items.map(renderSortItem)}
       </div>
    );
}
