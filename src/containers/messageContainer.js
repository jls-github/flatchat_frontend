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
        <div className="messageContainer">
            <h1>{title}</h1>
            <h3>{description}</h3>
            {populateMessages(messages, users)}
            <MessageForm onAddMessage={props.onAddMessage} />
            <ParticipantsContainer users={users} />
        </div>
    )
}

export default MessageContainer