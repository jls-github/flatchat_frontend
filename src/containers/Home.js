import React, { Component, Fragment } from 'react';
import ConversationsContainer from '../containers/conversationsContainer'
import MessageContainer from '../containers/MessageContainer';
import Cable from '../components/cable';
import AuthWrapper from '../HOCs/AuthWrapper'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constraints/index'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
          conversations: [],
          activeConversation: null
        }
      }
    
      componentDidMount = () => {
        fetch(`${API_ROOT}/conversations`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(json => this.setState({conversations: json}))
        .then(json => {
          this.state.conversations.map(convo=> {
            return (
                <ActionCableConsumer 
                    key={convo.id}
                    channel={{channel: 'MessagesChannel', conversation: convo.id}} 
                    onReceived={this.handleReceivedMessage}
                />
            )})})}
    
      handleClick = activeConversation => {
        this.setState({activeConversation: activeConversation})
      }
    
      // handleReceivedConversation = res => {
      //   const { conversation } = res
      //   this.setState({conversations: [...this.state.conversations, conversation]})
      // }
    
      handleReceivedMessage = res => {
        console.log("Here I am", res)
        const {message} = res
        this.setState(prevState => {
          const conversations = [...prevState.conversations]
          const convo = conversations.find(convo => convo.id === message.conversation_id)
          let messageFound = false
          convo.messages.forEach(msg => {
            if (message.id === msg.id) {
              messageFound = true
            }
          })
          if (!messageFound){
            convo.messages = [...convo.messages, message]
            this.setState({conversations})
          }
        })
      }
    
      onAddMessage = (message) => {
        fetch("http://localhost:3000/messages", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            message: {
              text: message,
              conversation_id: this.state.activeConversation.id
             } //hard coded - change with auth
          })
        })
      }
      render() {
          const {conversations, activeConversation} = this.state
        return(
            <Fragment>
    
                {/* <ActionCableConsumer 
                    channel={{channel: 'ConversationsChannel'}} 
                    onReceived={this.handleReceivedConversation} 
                  /> */}
                  <Cable conversations={conversations} handleReceivedMessage={this.handleReceivedMessage} />
    
                <ConversationsContainer conversations={conversations} handleClick={this.handleClick}/>
                {activeConversation ?
                    <MessageContainer activeConversation={activeConversation} onAddMessage={this.onAddMessage} />
                : null}
            </Fragment>
        )
      }
    
}

export default AuthWrapper(Home)