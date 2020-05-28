import React, {useState, useEffect, Fragment} from 'react';
import {Redirect} from 'react-router-dom'

const AuthWrapper = (Component) => {

    return function AuthWrapper2(props) {
    

        const [authorized, setAuthorized] = useState(false)
        const [pending, setPending] = useState(true)


        const isLoggedIn = () => {
            if (!pending && !authorized) {
                props.history.push("/login")
            } 
            return authorized && !pending
        }

        const validateUser = () => {
            fetch('http://localhost:3000/current_user', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res => {
                return res.json()})
            .then(json => {
                console.log(json)
                if (json.error) {
                    setPending(false)
                } else {
                    setAuthorized(true)
                    setPending(false)
                }
            })
        }

        useEffect(() => {
                validateUser()
            }, []
        )

        return (
            <Fragment>
                {authorized ? 
                    <Component />
                : null}
            </Fragment>
        )
    }
}

export default AuthWrapper