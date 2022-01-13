import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AuthOption from './authOption';

const h1Style = { marginLeft: '20px', fontFamily: 'Helvetica' ,color :'#e50914' }

class Home extends Component {
    render() {
        return (  
          
            <header className=" header">
                    <Link to="/"><h1 className="title" style = {h1Style} >BUZZ</h1></Link>
                    <AuthOption />               
            </header>
           );
    }
}
export default Home;