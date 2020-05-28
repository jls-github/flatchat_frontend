import React from 'react';
import {NavLink} from 'react-router-dom'

const Error = () => {
    return(
        <div>
        <div>Sorry, there was an error</div>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
        </div>
    )
}

export default Error