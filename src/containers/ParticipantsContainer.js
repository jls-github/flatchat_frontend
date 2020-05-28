import React from 'react';
import Participant from '../components/Participant'

const ParticipantsContainer = props => {

    const { users } = props

    const populateParticipants = () => {
        return users.map(user => {
            return <Participant user={user} />
        })
    }

    return(
        <div>
            <h3>Conversation Participants</h3>
            <ul>
                {populateParticipants()}
            </ul>
        </div>
    )
}

export default ParticipantsContainer