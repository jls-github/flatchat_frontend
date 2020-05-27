import React, {useState} from 'react';import React, {useState} from 'react';

const Signup = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordConfirmationhange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //make fetch request to server to authenticate
    }

    return (
        <div>
            <h1>Sign up!</h1>
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
                <input
                    value={passwordConfirmation}
                    onChange={e => handlePasswordConfirmationChange(e)} 
                    placeholder="Password"
                />
            </form>
        </div>
    )
}

export default Signup