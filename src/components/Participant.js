import React from 'react';

const Participant = (props) => {

    const {user} = props
    
    return(
        <li>
            {user.username}
        </li>
    )
}

export default Participant