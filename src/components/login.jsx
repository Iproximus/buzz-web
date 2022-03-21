import React, { useState, useContext } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Error from './validate/error';
import UserContext from './../context/userContext'
import Home from '../components/home'

const textFieldStyle = { position: 'relative', marginLeft: '10%', marginRight: '10%', backgroundColor: '#8c8c8c', color: 'white', width: '80%', borderRadius: '5px', marginBottom: '10px' }
const buttonStyle = { color: '#FFFFFF', background: '#e50914', textTransform: 'capitalize', marginBottom: '10px', marginLeft: '10%', marginRight: '10%', width: '80%' }
const h1Style = { marginLeft: '10%', fontFamily: 'Helvetica' }
const checkBoxStyle = { marginLeft: '10%', color: '#b4b4b4' };
const divStyle = { marginTop: '70px', background: 'transparent', backgroundColor: 'rgba(52, 52, 52, .9)' }

function Login() {

    const [error, setError] = useState('')
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const submituserLoginForm = async (e) => {
        e.preventDefault();
        try {
            const dataObj = { password, email };
            const response = await axios.post('http://localhost:1000/api/users/login', dataObj);
            setUserData({
                token: response.data.token,
                user: response.data.user
            });
            localStorage.setItem("auth-token", response.data.token);
            navigate("/")
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return (
        <div>
            <Home />
            <div style={divStyle} className='Login-component'>
                <h1 style={h1Style}>Sign In</h1>
                {error && <Error message={error} clearError={() => setError(undefined)} />}
                <form method="post" name="userRegistrationForm" onSubmit={submituserLoginForm} >

                    <TextField style={textFieldStyle} color="secondary" label="Enter email" variant="filled" type="email"
                        inputprops={{ style: { fontFamily: 'Arial', style: 'bold', color: 'white' } }}
                        name="email"
                        id="email"
                        onChange={e => setEmail(e.target.value)} />

                    <TextField style={textFieldStyle} color="secondary" label=" Enter password" variant="filled" type="password" inputprops={{ style: { fontFamily: 'Arial', style: 'bold', color: 'white' } }}
                        name="password"
                        id="password"
                        onChange={e => setPassword(e.target.value)} />

                    <Button style={buttonStyle} variant="contained" type="submit" value="Log in">Sign in</Button>
                    <FormControlLabel style={checkBoxStyle} control={<Checkbox color="primary" />} label="Remember me" /><br></br>
                </form>
            </div>
        </div>
    );
}
export default Login;
