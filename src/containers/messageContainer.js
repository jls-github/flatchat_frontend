import React from 'react';
import Message from '../components/message'
import MessageForm from '../components/MessageForm'
import ParticipantsContainer from './ParticipantsContainer'

const populateMessages = (messages, users) => {
    return messages.map(message => {
        return <Message key={message.id} message={message} user={users.find(user => user.id === message.user_id)}/>
    })
}

const MessageContainer = (props) => {

    const {title, description, messages, users} = props.activeConversation

    return (
        <div>
            <h3 className="banner">{title} : <span className="smaller">{description}</span></h3>
            <div className="messageContainer grid">
                <div className="msgView">
                    {populateMessages(messages, users)}
                    
                </div>
                <div className="participants">
                    <ParticipantsContainer users={users} />
                </div>
            </div>
            <div className="msgInput">
                <MessageForm onAddMessage={props.onAddMessage} />
            </div>
        </div>

        
    )
}

export default MessageContainer