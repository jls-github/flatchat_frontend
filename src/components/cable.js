import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({conversations, handleReceivedMessage}) => {
    return (
        <Fragment>
            {conversations.map(convo=> {
                return (
                    <ActionCable key={convo.id} channel={{channel: 'MessagesChannel', conversation: convo.id}} onReceived={handleReceivedMessage}/>
                )
            })}
        </Fragment>
    )
}
export default Cable