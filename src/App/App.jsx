import React, { useState, useEffect } from 'react';
import { makeStyles, CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import './App.css';
import MiniDrawer from "../components/controls/Drawer";
import UserContext from '../context/userContext'

//import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MenuAppBar from "../components/controls/AppBar";
// import Users from "../pages/Users/Users";
// import Register from '../components/register'
// import Login from '../components/login'
// import Home from '../components/home'
// import Message from '../components/message'

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})

const useStyles = makeStyles({
  appMain: {
    //paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post('http://localhost:1000/api/users/tokenIsValid', null, { headers: { "x-auth-token": token } });
      console.log(tokenResponse);
      if (tokenResponse.data) {
        const userRes = await axios.get('http://localhost:1000/api/users/', {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }
    checkLoggedIn();
  }, []);


  // -----------------without auth-login-page-------------------
  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className={classes.appMain}>
          <MiniDrawer />
        </div>
        <CssBaseline />
      </UserContext.Provider>
    </ThemeProvider>
  );

  // -----------------wiht-login-auth-page-------------------
  // return (
  //   <ThemeProvider theme={theme}>
  //     <UserContext.Provider value={{ userData, setUserData }}>
  //     <div className={classes.appMain}>
  //       <Routes>
  //           <Route exact path="*" element={<Message />} />
  //           <Route path="/register" element={<Register />} />
  //           <Route path="/login" element={<Login />} />
  //         </Routes>
  //     </div>
  //     <CssBaseline />
  //     </UserContext.Provider>
  //   </ThemeProvider>
  // );

  //----------------unknown format flow----------------------

  // return (
  //   <ThemeProvider theme={theme}>
  //     <SideMenu />
  //     <UserContext.Provider value={{ userData, setUserData }}>

  //     <div className={classes.appMain}>
  //       <Home/> 
  //       <Routes>
  //           <Route exact path="*" element={<Message />} />
  //           <Route path="/register" element={<Register />} />
  //           <Route path="/login" element={<Login />} />
  //         </Routes>
  //       <Header/>
  //      <MenuAppBar/> 
  //       <MiniDrawer/> 
  //      <Users /> 
  //     </div>
  //     <CssBaseline />
  //     </UserContext.Provider>
  //   </ThemeProvider>
  // );

}

export default App;
