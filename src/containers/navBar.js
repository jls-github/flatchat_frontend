import React, { Component } from 'react'
import ConversationsContainer from './conversationsContainer'
import { Link } from 'react-router-dom'


class NavBar extends Component {

  componentDidMount() {
    const M = window.M
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems,{});
  }

  render() {
    const { conversations, handleClick, onLogout } = this.props
    console.log(conversations)
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="home" data-target="slide-out" className="sidenav-trigger show-on-large "><i className="material-icons">menu</i></Link>
            <Link to="home" className="brand-logo right">FlatChat \\</Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
            </ul>
          </div>
        </nav>

        <ul id="slide-out" className="sidenav">
        <li onClick={(() => {localStorage.setItem("token", "")})}><Link to="login"><i className="material-icons">directions_run</i>Log Out</Link></li>
          <li><Link to="home"><i className="material-icons">playlist_add</i>Add Conversation</Link></li>
          <li><div className="divider"></div></li>
          <ConversationsContainer conversations={conversations} handleClick={handleClick}/>
        </ul>
      </div>
    )
  }
}

export default NavBar