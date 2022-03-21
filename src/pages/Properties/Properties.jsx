// UI screen adjustment  1 
// Update/delete/select all /by id API   2
// validations -> 5
// Filter    6
// remove picture column    3
// Navigation-menu formatted form   4

import React, { useState } from 'react'
import PropertyForm from "./PropertyForm";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as propertyService from "../../services/propertyService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import axios from 'axios';

import MultiStepForm from '../../components/PropertyRegisterationFrom/MultiStepForm'


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
    { id: 'smallPicture', label: 'Picture' },
    // { id: 'streetNumber', label: 'Street Number' },
    // { id: 'street', label: 'Street' },
    // { id: 'city', label: 'City' },
    { id: 'location', label: 'Location' },
    // { id: 'zip', label: 'Zip code' },
    // { id: 'lastName', label: 'Last Name' },
    // { id: 'firstName', label: 'First Name' },
    { id: 'ownerName', label: 'Owner'},
    { id: 'phone', label: 'Phone' },
    { id: 'email', label: 'Email' },
    { id: 'documents', label: 'Documents' },
    { id: 'duesStatus', label: 'Dues Status' },
    // { id: 'yearBuilt', label: 'Year Built' },
    // { id: 'area', label: 'Area' },
    // { id: 'lotArea', label: 'Lot Area' },
    // { id: 'bedRooms', label: 'Bed Rooms' },
    // { id: 'bathRooms', label: 'Bath Rooms' },
    // { id: 'storey', label: 'Storey' },
    // { id: 'street', label: 'Street' },
    //{ id: 'department', label: 'Department' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Properties() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(propertyService.getAllUsers())
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
                    return items.filter(x => x.firstName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (user, resetForm) => {
        if (user.id === 0){
            propertyService.insertUser(user)
            axios.post('http://localhost:2552/api/property/addProperty', user)
                .then((res) => {
                        console.log(res.data);
                this.res({ users: res.data });
            }).catch((error) => {
            console.log(error);
            });
        }
        else
            propertyService.updateUser(user)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(propertyService.getAllUsers())
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

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        propertyService.deleteUser(id);
        setRecords(propertyService.getAllUsers())
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
                        label="Search Properties"
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
                <TblContainer >
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell >{item.smallPicture}</TableCell>
                                    <TableCell>{item.city+ ', '+item.state}</TableCell>
                                    {/* <TableCell>{item.lastName}</TableCell>
                                    <TableCell>{item.firstName}</TableCell> */}
                                    <TableCell>{item.lastName+', '+item.firstName}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.documents}</TableCell>
                                    <TableCell>{item.duesStatus}</TableCell>
                                    {/* <TableCell>{item.department}</TableCell> */}
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Property Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                {/* <PropertyForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} /> */}

                    {/* <AppRouter
                    addOrEdit={addOrEdit}/> */}
                       <MultiStepForm
                    addOrEdit={addOrEdit}/>

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


