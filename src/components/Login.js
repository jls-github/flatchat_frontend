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
        //make fetch request to server to authenticate
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
            </form>
        </div>
    )
}

export default Login