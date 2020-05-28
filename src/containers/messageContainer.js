import React from 'react';
import Message from '../components/Message'
import MessageForm from '../components/MessageForm'
import ParticipantsContainer from './ParticipantsContainer'

const populateMessages = messages => {
    return messages.map(message => {
        return <Message key={message.id} message={message} />
    })
}

const MessageContainer = (props) => {

    const {title, description, messages, users} = props.activeConversation

    return (
        <div>
            <h1>{title}</h1>
            <h3>{description}</h3>
            {populateMessages(messages)}
            <MessageForm onAddMessage={props.onAddMessage} />
            <ParticipantsContainer users={users} />
        </div>
    )
}

export default MessageContainer