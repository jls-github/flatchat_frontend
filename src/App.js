import React, { Component } from 'react';
import ConversationsContainer from './containers/conversationsContainer'
import { ActionCable } from 'react-actioncable-provider';
import MessageContainer from './containers/MessageContainer';
import Cable from './components/cable';
import { API_ROOT, HEADERS } from './constraints/index'


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
    const {msg} = res
    const conversations = [...this.state.conversations]
    const convo = conversations.find(convo => convo.id === msg.conversation_id)
    convo.messages = [...convo.messages, msg]
    this.setState({conversations})
  }

  onAddMessage = (message) => {
    fetch("http://localhost:3000", {
      method: "POST",
      HEADERS,
      body: JSON.stringify({
        message: message,
        conversation: this.state.activeConversation.id,
        user: 1 //hard coded - change with auth
      })
    })
  }

  render() {
    const {conversations, activeConversation} = this.state
    return (
        <div>

          <ActionCable channel={{channel: 'ConversationsChannel'}} onReceived={this.handleReceivedConversation} />
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
