import React from 'react';

const errorStyle = {color: '#e50914' , marginLeft: "20%", padding:'10px' }
function Error (props) {
    return (
        <div className="error-notice">
            <span style = {errorStyle}>{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </div>
    );
}

export default Error;