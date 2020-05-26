import React, { Component } from 'react';
import ConversationsContainer from './containers/conversationsContainer'
import { ActionCable } from 'react-actioncable-provider';
import MessageContainer from './containers/messageContainer';
import Cable from './components/cable';
import { API_ROOT } from './constraints/index'


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
    .then(convos => this.setState({convos}))
  }

  handleClick = id => {
    this.setState({activeConversation: id})
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

  render() {
    const {conversations} = this.state
    return (
        <div>
          <ActionCable channel={{channel: 'ConversationsChannel'}} onReceived={this.handleReceivedConversation} />
          {this.state.conversations.length ? (
            <Cable conversations={conversations} handleReceivedMessage={this.handleReceivedMessage} />
          ): null}
          <ConversationsContainer conversations={conversations} />
        </div>
      );
  }
}

export default App;
