import React, {useState, Fragment} from 'react';
import {useHistory, Link} from 'react-router-dom'

const Signup = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [error, setError] = useState(false)

    const history = useHistory()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    first_name: firstName,
                    last_name: lastName,
                    password: password,
                    password_confirmation: passwordConfirmation
                }
            })
        })
        .then(res => res.json())
        .then(json => {
            if (json.error) {
                setError(true)
            } else {
            localStorage.setItem("token", json.jwt)
            setIsLoggedIn(true)
            }
        })
    }

    return (
        <Fragment>
            {error ? history.push('/error'):null}
            {isLoggedIn ? 
            history.push('/home')
            :
            <div className="login_container">
                <div className="login">
                <h2 className="cardHeader">Flatchat</h2>
                <h4 className="cardHeader">Sign up</h4>
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        value={username}
                        onChange={e => handleUsernameChange(e)} 
                        placeholder="Username"
                    />
                    <input
                        value={firstName}
                        onChange={e => handleFirstNameChange(e)} 
                        placeholder="First Name"
                    />
                    <input
                        value={lastName}
                        onChange={e => handleLastNameChange(e)} 
                        placeholder="Last Name"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => handlePasswordChange(e)} 
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={e => handlePasswordConfirmationChange(e)} 
                        placeholder="Password"
                    />
                    <button type="submit" className="button">Sign Up!</button>
                </form>
                <Link to="/login"><button className="button">Log In</button></Link>
            </div>
            </div>}
        </Fragment>
    )
}

export default Signup