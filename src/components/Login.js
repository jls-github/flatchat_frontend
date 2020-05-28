import React, {useState, Fragment} from 'react';
import {useHistory, Link} from 'react-router-dom'

const Login = () => {

    const history = useHistory()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState(false)

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                
                user: {
                    username: username,
                    password: password
                }
            })
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                setError(true)
            } else {
            localStorage.setItem("token", json.jwt)
            setLoggedIn(true)}
        })
    }

    return (
        <Fragment>
        {error ? history.push('/error'):null}
        {loggedIn ? 
            history.push('/home')
            :
        <div>
            <h1>Log in!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    value={username}
                    onChange={e => handleUsernameChange(e)} 
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={e => handlePasswordChange(e)} 
                    placeholder="Password"
                />
                <button type="submit" className="button">Log in</button>
            </form>
            <Link to="/signup"><button className="button">Sign Up</button></Link>
        </div>}
        </Fragment>
    )
}

export default Login