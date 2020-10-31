import React, {useState} from "react";
import styles from './sort.module.css'

export function SortContainer({children,onSort, ...props}) {

    return (
       <div {...props}>
           {children}
       </div>
    );
}
