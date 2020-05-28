import React from 'react';

const Participant = (props) => {

    const {user} = props
    
    return(
        <li className="participant_li">
            {user.username}
        </li>
    )
}

export default Participant