import React from 'react'
import { Dialog, DialogTitle, DialogContent,Typography } from '@material-ui/core';
import Controls from "./controls/Controls";
import CloseIcon from '@material-ui/icons/Close';

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    return (
        <Dialog open={openPopup} maxWidth="xl">
            <DialogTitle  >
                <div style={{ display: 'flex' , paddingTop:'-10px', marginBottom:'-5px' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1  }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon style={{height: '15px', width: '15px'}} />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}
