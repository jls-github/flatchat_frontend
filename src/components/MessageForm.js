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
            <input onChange={e => handleChange(e)} value={message} ></input>
            <button type="submit" />
        </form>
    )

}

export default MessageForm