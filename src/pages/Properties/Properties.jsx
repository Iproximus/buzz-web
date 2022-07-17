import React, { useState,useEffect } from 'react'
import { Paper, makeStyles,  TableContainer, Table, Button, TableSortLabel, Grid, TablePagination, 
    InputAdornment, TableHead, Avatar, TableRow,TableBody, TableCell, Toolbar } from '@material-ui/core';


import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import axios from 'axios';
import AddPropertyFrom from '../Properties/PropertyForm/FormAdd/AddPropertyFrom'
import EditPropertyFrom from './PropertyForm/FromEdit/EditPropertyFrom';


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
    {
        id: '_id', label: 'Picture', width: '220', disableSorting: true},
    {
        id: 'location', label: 'Location', width: '180', disableSorting: true,
        valueGetter: (sc) => `${sc.row.state[1] || ''} ${sc.row.city[1] || ''}`,
    },
    {
        id: 'owner', label: 'Owner', width: '150', disableSorting: true,
        valueGetter: (owner) => `${owner.row.firstname || ''} ${owner.row.lastname || ''}`,
    },
    { id: 'phone', label: 'Phone', width: '140', cursor: 'pointer' },
    { id: 'email', label: 'Email', width: '200', cursor: 'pointer' },
    { id: 'documents', label: 'Documents', width: '150', disableSorting: true },
    { id: 'due Status', label: 'Due Status', width: '150', disableSorting: true },
    { id: 'actions', label: 'Actions', disableSorting: true ,
    Header: () => (<div style={{ textAlign: "right" }}>Right aligned</div>)
}
]


export default function Properties() {

    const classes = useStyles();
    const [recordForAdd, setRecordForAdd] = useState(null)
    
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openAddPopup, setOpenAddPopup] = useState(false)
    const [openEditPopup, setOpenEditPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [toupdate, setToUpdate] = useState({ updateproperty: {} });

    const [post, setPost] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()
    const [recordForEdit, setRecordForEdit] = useState(null)
    
    useEffect(() => {
        axios.get('http://localhost:3000/propertys/listAllpropertys')
            .then(res => {
                setPost(res.data);
            });
    }, [setPost]);

    const deleteProp = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        axios.delete('http://localhost:3000/propertys/deleteproperty/' + id)
            .then(res => {
                setPost(listall())
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfully',
                    type: 'error'
                })
                console.log(res.data);
            });
    }

    const listall = () => {
        axios.get('http://localhost:3000/propertys/listAllpropertys')
            .then(res => {
                return setPost(res.data);
            });
    }

    const getpropertybyid = (id) => {
        axios.get('http://localhost:3000/propertys/getproperty/' + id)
            .then(res => {
                setToUpdate({ updateproperty: res.data });
            });

    }

    if (!post) return null;

    const handleChangePage = (event, newPage) => { setPage(newPage); };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    };

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.firstname.toLowerCase().includes(target.value))
            }
        })
    }

    const handleSortRequest = cellId => {
        const isAsc = orderBy === cellId && order === "asc";
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(cellId)
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(post), getComparator(order, orderBy))
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    }

    const addProperty = (user, resetForm) => {
        if (user.id === 0) {
            
            axios.post('http://localhost:2552/api/property/addProperty', user)
                .then((res) => {
                    console.log(res.data);
                    this.res({ users: res.data });
                }).catch((error) => {
                    console.log(error);
                });
        }
      }

      const openInEditPopup = row => {
        getpropertybyid(row._id);
        setRecordForEdit(row)
        setOpenEditPopup(true)
    }

    return (
        <>
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
                        onClick={() => { setOpenAddPopup(true); setRecordForAdd(null); }}
                    />
                    
                </Toolbar>
                <TableContainer component={Paper} sx={{ maxHeight: '550px' }}>
                    <Table className={classes.table} size="small" stickyHeader={true}  >
                        <TableHead >
                            <TableRow  >
                                {
                                    headCells.map(headCell => (
                                        <TableCell key={headCell.id}
                                            sortDirection={orderBy === headCell.id ? order : false}>
                                            {headCell.disableSorting ? headCell.label :
                                                <TableSortLabel
                                                    active={orderBy === headCell.id}
                                                    direction={orderBy === headCell.id ? order : 'asc'}
                                                    onClick={() => { handleSortRequest(headCell.id) }}>
                                                    {headCell.label}
                                                </TableSortLabel>
                                            }
                                        </TableCell>))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ "& tr:nth-of-type(2n+1)": { backgroundColor: "#F5F5F5" } }} >

                            {recordsAfterPagingAndSorting().map(row => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    <TableCell><Grid container><Grid item sm={3}>
                                        <Avatar style={{ backgroundColor: "#333996" }}>{row.firstname[0]}</Avatar>
                                    </Grid></Grid ></TableCell>
                                    <TableCell>{row.state[1] + ', ' + row.city[1]}</TableCell>
                                    <TableCell>{row.firstname + ' ' + row.lastname}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>null</TableCell>
                                    <TableCell>{row.duestatus}</TableCell>

                                    <TableCell>
                                     
                                    <Button title="Edit"onClick={() => {openInEditPopup(row);}} ><span role='img' aria-label='Update'>📝</span></Button>
                                    {/* <Tooltip title="Delete"></Tooltip> */}
                                            <Button title="Delete"
                                                onClick={() => {
                                                    setConfirmDialog({
                                                        isOpen: true,
                                                        title: 'Are you sure to delete this record?',
                                                        subTitle: "You can't undo this operation",
                                                        onConfirm: () => { deleteProp(row._id); }
                                                    })
                                                    var c = post.filter(item => item.id !== row._id);
                                                    setPost(c);
                                                }}><span role='img' aria-label='Delete'>❌</span></Button>
                                        
                                    </TableCell>
                                </TableRow>)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={post.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    showFirstButton={true}
                    showLastButton={true}
                    
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Popup
                title="Edit Property Form"
                openPopup={openEditPopup}
                setOpenPopup={setOpenEditPopup}>
                <EditPropertyFrom propdata={toupdate} />
            </Popup>

            <Popup
                title="Add Property Form"
                openPopup={openAddPopup}
                setOpenPopup={setOpenAddPopup}>
                <AddPropertyFrom addOrEdit={addProperty} />
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


