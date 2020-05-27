import React, { Component } from 'react';
import ConversationsContainer from './containers/ConversationsContainer'
import { ActionCableConsumer } from 'react-actioncable-provider';
import MessageContainer from './containers/MessageContainer';
import Cable from './components/Cable';
import { API_ROOT, HEADERS } from './constraints/index'

const actioncable = require("actioncable")



class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      conversations: [],
      activeConversation: null
    }
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
    .then(res => res.json())
    .then(json => this.setState({conversations: json}))
  }

  handleClick = activeConversation => {
    this.setState({activeConversation: activeConversation})
  }

  handleReceivedConversation = res => {
    const { conversation } = res
    this.setState({conversations: [...this.state.conversations, conversation]})
  }

  handleReceivedMessage = res => {
    console.log("Here I am", res)
    const {message} = res
    this.setState(prevState => {
      const conversations = [...prevState.conversations]
      const convo = conversations.find(convo => convo.id === message.conversation_id)
      convo.messages = [...convo.messages, message]
      this.setState({conversations})
    })
  }

  onAddMessage = (message) => {
    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        message: {
          text: message,
          conversation_id: this.state.activeConversation.id,
          user_id: 13
         } //hard coded - change with auth
      })
    })
  }

  render() {
    const {conversations, activeConversation} = this.state
    return (
        <div>

          <ActionCableConsumer 
            channel={{channel: 'ConversationsChannel'}} 
            onReceived={this.handleReceivedConversation} 
          />
          {this.state.conversations.length ? (
            <Cable conversations={conversations} handleReceivedMessage={this.handleReceivedMessage} />
          ): null}

          <ConversationsContainer conversations={conversations} handleClick={this.handleClick}/>

          {activeConversation ?
            <MessageContainer activeConversation={activeConversation} onAddMessage={this.onAddMessage} />
          : null}
        </div>
      );
  }
}

export default App;
