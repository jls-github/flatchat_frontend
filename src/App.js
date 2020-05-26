import React, { Component } from 'react';
import ConversationsContainer from './containers/ConversationsContainer'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      conversations: [{title: "first"}, {title: "second"}],
      activeConversation: null
    }
  }

  render() {
    const {conversations} = this.state
    return (
        <div>
          Hello World!
          <ConversationsContainer conversations={conversations} />
        </div>
      );
  }
}

export default App;
