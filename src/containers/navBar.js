import React, { Component } from 'react'
import ConversationsContainer from './conversationsContainer'


class NavBar extends Component {

  componentDidMount() {
    const M = window.M
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems,{});
    });
  }

  render() {
    const { conversations, handleClick, onLogout } = this.props
    console.log(conversations)
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" data-target="slide-out" className="sidenav-trigger show-on-large "><i className="material-icons">menu</i></a>
            <a href="#" className="brand-logo right">FlatChat \\</a>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
            </ul>
          </div>
        </nav>

        <ul id="slide-out" className="sidenav">
        <li onClick={onLogout}><a href="#!"><i className="material-icons">directions_run</i>Log Out</a></li>
          <li><a href="#!"><i className="material-icons">playlist_add</i>Add Conversation</a></li>
          <li><div className="divider"></div></li>
          <ConversationsContainer conversations={conversations} handleClick={handleClick}/>
        </ul>
      </div>
    )
  }
}

export default NavBar