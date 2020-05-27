import React from 'react'

const Message = (props) => {

    const {message} = props

    return(
        <div>
            {message.text}
        </div>
    )
}

export default Message