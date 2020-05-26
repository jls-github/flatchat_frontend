import React from 'react';

const populateConversations = (conversations) => {
    return conversations.map( conversation => {
        return <li>{conversation.title}</li>
    })
}

const ConversationsContainer = (props) => {

    const conversations = props.conversations

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