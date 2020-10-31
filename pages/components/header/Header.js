import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './header.module.css'
import {useIsMounted} from "../../../hooks";


export function Header() {
    /**
     * @type {React.RefObject<HTMLDivElement>}
     */
    const ref = React.useRef();
    const [style, setStyle] = React.useState(undefined);
    const isMounted = useIsMounted();
    React.useEffect(() => {
        if (isMounted) {
            const listener = () => {
                if(ref.current) {
                    setStyle({
                        height: ref.current.getBoundingClientRect().height + "px"
                    });
                }
            };
            listener();
            window?.addEventListener("resize", listener);
            return () => window?.removeEventListener("resize", listener)
        }
    }, [isMounted]);
    return (
        <div className={styles.root} style={style}>
            <AppBar position="fixed" ref={ref}>
                <Toolbar>
                    <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={styles.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
