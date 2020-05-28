import React from 'react'

const Message = (props) => {

    const {message, user} = props
    return(
        <div>
            <p>{user.username}:&nbsp;{message.text} &nbsp; &nbsp; at &nbsp;
            {Date(message.created_at)}</p>
        </div>
    )
}

export default Message