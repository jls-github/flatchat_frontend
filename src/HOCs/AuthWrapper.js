import React from 'react';
import Login from '../components/login'

const AuthWrapper = (component) => {

    const isLoggedIn = () => {
        
    }

    return (
        <fragment>
            {isLoggedIn ? 
                {component}
            : Login}
        </fragment>
    )
}