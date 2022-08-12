import React, { useState, useEffect } from "react";
import { Paper, makeStyles, TableContainer, Table, Button, TableSortLabel, Grid, TablePagination, InputAdornment, TableHead, Avatar, TableRow, TableBody, TableCell, Toolbar} from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import axios from "axios";
import Form from "./PropertyForm/AddUpdate/Form";
import message from "../../helper/MessageText";
require('dotenv').config()


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "30%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  {
    id: "_id",
    label: "Picture",
    width: "220",
    disableSorting: true,
  },
  {
    id: "location",
    label: "Location",
    width: "180",
    disableSorting: true,
    valueGetter: (sc) => `${sc.row.state[1] || ""} ${sc.row.city[1] || ""}`,
  },
  {
    id: "owner",
    label: "Owner",
    width: "150",
    disableSorting: true,
    valueGetter: (owner) =>
      `${owner.row.firstname || ""} ${owner.row.lastname || ""}`,
  },
  { id: "phone", label: "Phone", width: "140", cursor: "pointer" },
  { id: "email", label: "Email", width: "200", cursor: "pointer" },
  { id: "documents", label: "Documents", width: "150", disableSorting: true },
  { id: "due Status", label: "Due Status", width: "150", disableSorting: true },
  {
    id: "actions",
    label: "Actions",
    disableSorting: true,
    Header: () => <div style={{ textAlign: "right" }}>Right aligned</div>,
  },
];

export default function Properties() {
  const classes = useStyles();
  
  const [filterFn, setFilterFn] = useState({fn: (items) => {return items;},});
  const [openPopup, setOpenPopup] = useState(false);
  const [addedit, setAddedit] = useState(null);
  const [notify, setNotify] = useState({isOpen: false,message: "",type: ""});
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: ""});
  const [toupdate, setToUpdate] = useState({ updateproperty: {} });
  
  const [post, setPost] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const ApiURL = process.env.REACT_APP_API_HOST+process.env.REACT_APP_API_PORT;

  useEffect(() => {
    axios
    .get(ApiURL+'/properties/listAllproperties')
    .then((res) => {
      setPost(res.data);
    });
  }, [setPost]);
  
  
  const deleteProp = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    axios
      .delete(ApiURL+'/properties/deleteproperty/' + id)
      .then((res) => {
        setPost(listall());
        setNotify({
          isOpen: true,
          message: message.PROPERTY_DELETED,  
          type: "error",
        });
      });
  };

  const listall = () => {
    axios
      .get(ApiURL+'/properties/listAllproperties')
      .then((res) => {
        return setPost(res.data);
      });
  };

  const getpropertybyid = (id) => {
    axios
      .get(ApiURL+'/properties/getproperty/' + id)
      .then((res) => {
        setToUpdate({ updateproperty: res.data });
      });
  };

  const getImageFromS3 = (uploadimg) => {
    const image = axios
      .get(ApiURL+'/s3bucket/getimage/' + uploadimg)
      .then((res) => {
        //const getbase64 = Buffer.from(image.data).toString('base64');
        console.log("url", image);
        return image;
      });
  };

  if (!post) return null;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x.firstname.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const handleSortRequest = (cellId) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

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
    return order === "desc"
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
    return stableSort(filterFn.fn(post), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  
  // const addupdate = (id) =>{
  //   if (id === null || id === undefined) {
  //     setOpenPopup(true);
  //   }else{
  //     setOpenPopup(true);
      
  //     getpropertybyid(id);
  //   }
  // }

  return (
    <div>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Properties"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Controls.Button
            text="Add"
            variant="contained"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              const id = null;
              setAddedit(id);
              setOpenPopup(true)
            }}
          />
        </Toolbar>
        <TableContainer component={Paper} sx={{ maxHeight: "550px" }}>
          <Table className={classes.table} size="small" stickyHeader={true}>
            <TableHead style={{backgroundColor:"red"}}>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.disableSorting ? (
                      headCell.label
                    ) : (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={() => {
                          handleSortRequest(headCell.id);
                        }}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{ "& tr:nth-of-type(2n+1)": { backgroundColor: "#F5F5F5" } }}
            >
              {recordsAfterPagingAndSorting().map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>
                    {row.uploadimg && (
                      <img
                        //src={getImageFromS3(row.uploadimg)}

                        alt="Property"
                        style={{
                          alignItems: "center",
                          width: "80px",
                          borderRadius: 6,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{row.state[1] + ", " + row.city[1]}</TableCell>
                  <TableCell>
                    <Grid container>
                      <Grid>
                        <Avatar
                          style={{
                            backgroundColor: "#333996",
                            width: 30,
                            height: 30,
                          }}
                        >
                          {row.firstname[0]}
                        </Avatar>
                      </Grid>
                      <Grid style={{marginTop: "5px", marginLeft: "10px"}}>
                        {row.firstname + " " + row.lastname}
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell> - </TableCell>
                  <TableCell>{row.duestatus}</TableCell>

                  <TableCell>
                    <Button
                      title="Edit"
                      onClick={() => {
                        const id = row._id;
                        setAddedit(id);
                        setOpenPopup(true);
                        getpropertybyid(id);
                        }}>
                      <span role="img" aria-label="Update">📝</span>
                    </Button>
                    <Button
                      title="Delete"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: "Are you sure to delete this record?",
                          subTitle: "You can't undo this operation",
                          onConfirm: () => {

                            deleteProp(row._id);
                          },
                        });
                        var c = post.filter((item) => item.id !== row._id);
                        setPost(c);
                      }}
                    >
                      <span role="img" aria-label="Delete">
                        ❌
                      </span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={post.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Popup
        title = {addedit === null ? "Property" : "Edit Property"} 
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        {addedit === null || undefined ? (<Form propdata={null} addedit={null}/>) : 
        (<Form propdata={toupdate} addedit={addedit}/>) }
        
      </Popup> 

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}