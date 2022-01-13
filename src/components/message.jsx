import React, { useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from './../context/userContext';
import Users from '../pages/Users/Users'

const welcome = {marginLeft : "45%", fontFamily: 'Helvetica',  textTransform: 'capitalize' }

function Message () {
    const {userData} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData.user)
        navigate("/login");
    }, []);
    return (
        <div>
            {userData.user ? (
                // <h1 style = {welcome}>Welcome</h1>
                <div><Users /></div>
            ) : (
                <>
                    <h2>Logout done</h2>
                    <Link to="/login">Login</Link>
                </>
            )}
        </div>
    );
}
 
export default Message;