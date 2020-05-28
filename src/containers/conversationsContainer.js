import React from 'react';
import Conversation from '../components/Conversation.js'

const populateConversations = (conversations, handleClick) => {
    console.log(conversations)
    return conversations.map( conversation => {
        return <Conversation key={conversation.id} handleClick={handleClick} conversation={conversation} />
    })
}

const ConversationsContainer = (props) => {

    const conversations = props.conversations
    const handleClick = props.handleClick

    return (
        <div>
            {conversations ? 
                <div>
                    <h4 className="conversation_header">All Conversations</h4>
                    <ul>
                        {populateConversations(conversations, handleClick)}
                    </ul>
                </div>
            :
                null
            }
        </div>
    )

}


export default ConversationsContainer