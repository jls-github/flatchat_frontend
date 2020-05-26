import React from 'react';

const populateConversations = (conversations, handleClick) => {
    return conversations.map( conversation => {
        return <li key={conversation.id} onClick={handleClick}>{conversation.title}</li>
    })
}

const ConversationsContainer = (props) => {

    const conversations = props.conversations
    const handleClick = props.handleClick

    return (
        <div>
            {conversations ? 
                <div>
                    <h3>All Conversations</h3>
                    <ul>
                        {populateConversations(conversations)}
                    </ul>
                </div>
            :
                null
            }
        </div>
    )

}


export default ConversationsContainer