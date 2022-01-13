import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import axios from 'axios';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Users from "../pages/Users/Users";

import Register from '../components/register'
import Login from '../components/login'
import Home from '../components/home'
import Message from '../components/message'
import UserContext from '../context/userContext'


const theme = createMuiTheme({
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
      const tokenResponse = await axios.post('http://localhost:2552/api/users/tokenIsValid', null, { headers: { "x-auth-token": token } });
      console.log(tokenResponse);
      if (tokenResponse.data) {
        const userRes = await axios.get('http://localhost:2552/api/users/', {
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


  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Home />
        <Routes>
          <Route exact path="/" element={<Message />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <div className={classes.appMain}><Users /></div> */}
          {/* <CssBaseline /> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>

  );
}

export default App;
