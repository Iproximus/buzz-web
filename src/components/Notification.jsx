import React from 'react'
import { Snackbar, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
        top: theme.spacing(3)
    }
}))

export default function Notification(props) {

    const { notify, setNotify } = props;
    const classes = useStyles()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false
        })
    }

    return (
        <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={1000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'bottom'  }}
            onClose={handleClose}>
            <Alert
                variant='filled'
                severity={notify.type}
                onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}
