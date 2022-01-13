import { TextField, Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import axios from 'axios';
import Error from './validate/error';
import UserContext from './../context/userContext'

const textFieldStyle = { position: 'relative', background: '#8c8c8c', marginLeft: '10%', marginRight: '10%', hoverColor: "e50914", width: '80%', borderRadius: '5px', marginBottom: '10px' }
const buttonStyle = { color: '#FFFFFF', textTransform: 'capitalize', background: '#e50914', marginBottom: '10px', marginLeft: '10%', marginRight: '10%', width: '80%' }
const h1Style = { marginLeft: '10%', fontFamily: 'Helvetica' }
const divStyle = { marginTop: '70px',background: 'transparent', backgroundColor: 'rgba(52, 52, 52, .9)' }


function Register() {

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phnumber, setPhnumber] = useState();
  const [password, setPassword] = useState();

  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();


  const submituserRegistrationForm = async (e) => {
    e.preventDefault();
    try {
      const dataObj = { username, email, phnumber, password };
      const loginfo = { email, password };
      await axios.post('http://localhost:2552/api/users/register', dataObj);
      const loginResponse = await axios.post('http://localhost:2552/api/users/login', loginfo);
      setUserData({
        token: loginResponse.data.token,
        user: loginResponse.data.user
      });
      localStorage.setItem("auth-token", loginResponse.data.token);
      navigate("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg)
    }
  };

  return (
    < div style={divStyle} className='Reg-component' >

      <h1 style={h1Style}>Sign Up</h1>
      {error && <Error message={error} clearError={() => setError(undefined)} />}
      <form method="post" name="userRegistrationForm" onSubmit={submituserRegistrationForm} >

        <TextField style={textFieldStyle} color="secondary" label="Enter name" variant="filled" type="name"
          name="username"
          id="username"
          onChange={e => setUsername(e.target.value)} />


        <TextField style={textFieldStyle} color="secondary" label="Enter email" variant="filled" type="email"
          name="email"
          id="email"
          onChange={e => setEmail(e.target.value)} />


        <TextField style={textFieldStyle} color="secondary" label="Enter phone number" variant="filled" type="number"
          name="phnumber"
          id="phnumber"
          onChange={e => setPhnumber(e.target.value)} />


        <TextField style={textFieldStyle} color="secondary" label=" Enter password" variant="filled" type="password" autoComplete="current-password"
          name="password"
          id="password"
          onChange={e => setPassword(e.target.value)} />

        <Button style={buttonStyle} variant="contained" type="submit" value="Register">Sign up</Button>

      </form>
    </div >
  );
}

export default Register;