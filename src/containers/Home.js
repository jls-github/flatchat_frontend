import React, { Component, Fragment } from 'react';
import ConversationsContainer from '../containers/conversationsContainer'
import MessageContainer from '../containers/MessageContainer';
import Cable from '../components/cable';
import AuthWrapper from '../HOCs/AuthWrapper'
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constraints/index'

const actioncable = require("actioncable")

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
          conversations: [],
          activeConversation: null,
          error: false
        }
      }
    
      componentDidMount = () => {

        fetch(`${API_ROOT}/conversations`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
         })
      .then(res => res.json())
      .then(json => {

        if (json.error) {
          this.setState({error: true})
        } else {

        this.setState({conversations: json})
        this.cable = actioncable.createConsumer('ws://localhost:3000/cable')
        this.conversationChannels = []

        json.forEach(conversation => {

          this.conversationChannels[`${conversation.id}`] = this.cable.subscriptions.create({
            channel: "MessagesChannel",
            id: conversation.id
          },{
            connected: () => {
              console.log("connected")
            },
            disconnected: () => {},
            received: data => {this.handleReceivedMessage(data)}
          })
        }
        )
        console.log(this.conversationChannels)
      }})

        


        }
    
      handleClick = activeConversation => {
        this.setState({activeConversation: activeConversation})


      }

      // componentDidUpdate() {
      //   if(this.state.activeConversation){
      //   this.cable = actioncable.createConsumer('ws://localhost:3000/cable')

      //     this.conversationChannel = this.cable.subscriptions.create({
      //       channel: "ConversationsChannel",
      //       id: this.state.activeConversation.id
      //     },{
      //       connected: () => {
      //         console.log("connected")
      //       },
      //       disconnected: () => {},
      //       received: data => {console.log("receiving data")}
      //     })
      //   }
      // }
    
      // handleReceivedConversation = res => {
      //   const { conversation } = res
      //   this.setState({conversations: [...this.state.conversations, conversation]})
      // }
    
      handleReceivedMessage = message => {

        const {text, conversation_id} = message

        console.log("Here I am", message)
        this.setState(prevState => {
          const conversations = [...prevState.conversations]
          const convo = conversations.find(convo => convo.id === conversation_id)
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
        // fetch("http://localhost:3000/messages", {
        //   method: "POST",
        //   headers: {
        //     "Content-type": "application/json",
        //     Accept: "application/json",
        //     Authorization: `Bearer ${localStorage.getItem("token")}`
        //   },
        //   body: JSON.stringify({
        //     message: {
        //       text: message,
        //       conversation_id: this.state.activeConversation.id
        //      } 
        //   })
        // })

        this.conversationChannels[this.state.activeConversation.id].send({
          text: message,
          conversation_id: this.state.activeConversation.id,
          user_id: localStorage.getItem("token")
        })
      }
      render() {
          const {conversations, activeConversation, error} = this.state
        return(
            <Fragment>
              {error ? this.props.history.push('/login') : null}
    
                <ConversationsContainer conversations={conversations} handleClick={this.handleClick}/>
                {activeConversation ?
                    <MessageContainer activeConversation={activeConversation} onAddMessage={this.onAddMessage} />
                : null}
            </Fragment>
        )
      }
    
}

export default Home