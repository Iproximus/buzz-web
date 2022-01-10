// change the icons --------------------------------------------------FINSIHED
// adding the routing functionality-----------------------------------FINISHED
// drawer height adjustment-------------------------------------------FINISHED
// responsive
// remove name from menu and add it below menu icon-------------------FINISHED
// Log out separate word----------------------------------------------FINISHED
// buzz => logo ,center of the topbar contains a organization name----FINISHED
// adding name below the icon in drawer

import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import logo from './../../assets/images/netflix.png';
import PropTypes from 'prop-types';
import AccountCircle from '@material-ui/icons/AccountCircle';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {List,ListItem} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuAppBar from "../controls/AppBar";
import InboxIcon from '@material-ui/icons/Dashboard';
import UsersIcon from '@material-ui/icons/PeopleAlt';
import PropertiesIcon from '@material-ui/icons/Apps';
 import ReportsIcon from '@material-ui/icons/Assignment';
 import SettingsIcon from '@material-ui/icons/Settings';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import '../../styles/style.css';
import Dashboard from "../../pages/Dashboard"
import Users from '../../pages/Users/Users';
import Properties from "../../pages/Properties/Properties";
import Reports from "../../pages/Reports";
import Settings from "../../pages/Settings";

const drawerWidth = 240;

const styles = theme => ({

    root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
    }),
  },
  menuButton: {
    marginLeft: 12,
    duration: theme.transitions.duration.enteringScreen,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    overflow: 'scroll',
    
  },
});

class MiniDrawer extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
            
    //         "show" : null
    //     };
    // }
    // handleToggle = () => this.setState({open: this.state.open});

    // showDashboard = () => {
    //     this.setState({show: 'Dashboard'});
    // }
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  render() {
    const { classes, theme } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);


    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <img src={logo} class="organizationLogo"/>  
            <Typography variant="title" color="inherit" noWrap class="organizationName">
              BUZZ
            </Typography>

            
            {auth && (
              <div class="iconMenu">
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                   anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                   open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Change Password</MenuItem>
                  <MenuItem onClick={this.handleClose}>Log Out</MenuItem>
                  
                </Menu>
                <b>John</b>
              </div>
            )}
          </Toolbar>
             
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
              {/* <ListItem>Hai</ListItem> */}
            {/* {mailFolderListItems} */}
            <Link to="/dashboard" class="link">
            <ListItem button>
          <ListItemIcon>
            <InboxIcon/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        </Link>
        <Link to="/users" class="link">
        <ListItem button>
          <ListItemIcon>
            <UsersIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        </Link>
        <Link to="/properties" class="link">
        <ListItem button>
          <ListItemIcon>
            <PropertiesIcon />
          </ListItemIcon>
          <ListItemText primary="Properties" />
        </ListItem>
        </Link>
        <Link to="/reports" class="link">
        <ListItem button>
          <ListItemIcon>
            <ReportsIcon />
          </ListItemIcon>
          <ListItemText primary="Reports"/>
        </ListItem>
        </Link>
        <Link to="/settings" class="link">
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        </Link>
              </List>
          {/* <Divider /> */}
          {/* <List>{otherMailFolderListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography noWrap>
              <Routes>
                  <Route path="/dashboard" element={<Dashboard/>}/>
                  <Route path="/users" element={<Users/>}/>
                  <Route path="/properties" element={<Properties/>}/>
                  <Route path="/reports" element={<Reports/>}/>
                  <Route path="/settings" element={<Settings/>}/>
              </Routes>
              </Typography>
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
