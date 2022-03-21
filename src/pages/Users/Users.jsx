import React, { useState } from 'react'
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import UserForm from "./UserForm";
import useTable from "../../components/useTable";
import * as userService from "../../services/userService";
import Controls from "../../components/controls/Controls";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import axios from "axios";

//import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
//import PageHeader from "../../components/PageHeader";
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(0),
        padding: theme.spacing(1)
    },
    searchInput: {
        width: '30%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'firstname', label: 'First Name' },
    { id: 'lastname', label: 'Last Name' },
    { id: 'emailid', label: 'Email Address' },
    { id: 'role', label: 'Role' },
    { id: 'phnumber', label: 'Mobile Number' },
    //{ id: 'department', label: 'Department' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Users() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(userService.getAllUsers())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.firstname.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (user, resetForm) => {
        if (user.id === 0)
            // userService.insertUser(user)
            axios.post('http://localhost:2552/api/users/addUser', user)
                .then((res) => {
                    console.log(res.data);
                    this.res({ users: res.data });
                }).catch((err) => {
                    console.log(err);
                })
        else
            // userService.updateUser(user)
            axios.patch('http://localhost:2552/api/users/updateUser/:_id', user)
                .then((res) => {
                    console.log(res.data);
                    this.res({ users: res.data });
                }).catch((err) => {
                    console.log(err);
                })
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(userService.getAllUsers())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success',

        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = _id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        userService.deleteUser(_id);
        setRecords(userService.getAllUsers())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
            {/* <PageHeader
                title="New Employee"
                subTitle="Form design with validation"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            /> */}
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Users"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />

                    <Controls.Button
                        text="Add"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />

                </Toolbar>
                <TblContainer>
                    <TblHead />
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="User Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UserForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit}
                />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}