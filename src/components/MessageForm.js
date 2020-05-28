import React, {useState} from 'react'

const MessageForm = (props) => {

    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.onAddMessage(message)
        setMessage("")
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <input onChange={e => handleChange(e)} value={message} placeholder="What do you want to say?"></input>
            <button type="submit">Send</button>
        </form>
    )

}

export default MessageForm