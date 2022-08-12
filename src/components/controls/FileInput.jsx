import React from 'react'
import {  Input, makeStyles } from '@material-ui/core';
import './../../styles/style.css'

const useStyles = makeStyles({
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    }
});

export default function FileInput(props) {
    const classes = useStyles();
    const { name, label, value, error = null, onChange, ...other } = props;
    return (
        <>
            <lable style={{paddingLeft: '10px' }}>Upload image( jpg, png )</lable>
            <br></br>
            <Input
                className='upload-file-box'
                type="file"
                InputProps={{ classes }}
                style={{ color: "green", padding: '10px' ,borderBottomColor:'red'}}
                variant="outlined"
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...other}
                {...(error && { error: true, helperText: error })}
            />
        </>
    )
}
