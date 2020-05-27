import React, {useState} from 'react';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

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
        .then(json => localStorage.setItem("token", json.jwt))
    }

    return (
        <div>
            <h1>Log in!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    value={username}
                    onChange={e => handleUsernameChange(e)} 
                    placeholder="Username"
                />
                <input
                    value={password}
                    onChange={e => handlePasswordChange(e)} 
                    placeholder="Password"
                />
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login