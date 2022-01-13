import { Button } from "@material-ui/core";
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './../context/userContext';

const loginBtn = { color: '#FFFFFF', background: '#e50914', textTransform: 'capitalize', marginRight: '20px', width: '100px', }
const signupBtn = { color: '#FFFFFF', background: '#e50914', textTransform: 'capitalize', marginRight: '20px', width: '100px' }
const nameStyle = {fontWeight: 'bold',fontFamily: 'Helvetica',  textTransform: 'capitalize', color : '', marginRight : "20px"}
function AuthOption() {
    const { userData, setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const register = () => navigate("/register");
    const login = () => navigate("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token", "");
    };
    return (
        <nav className="auth-options">
            {userData.user ? (
                <>
                    <label style = {nameStyle}>{userData.user.username}</label>
                    
                    <Button style={signupBtn} onClick={logout}>Log Out</Button>
                </>


            ) : (
                <>
                    <Button style={signupBtn} onClick={register}>Sign Up</Button>
                    <Button style={loginBtn} onClick={login}>Log In</Button>
                </>
            )}
        </nav>
    )
}

export default AuthOption;