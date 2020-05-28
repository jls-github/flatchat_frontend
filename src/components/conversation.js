import React from 'react';


const Conversation = (props) => {

    console.log(props)

    const { handleClick, conversation } = props

    return (
        <li className="conversation_li" onClick={() => handleClick(conversation)}>{conversation.title}</li>
    )

}

export default Conversation;