// import React, {Fragment, Component} from 'react';

// class AuthWrapper extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             authorized: false,
//             pending: false
//         }
//     }
    

//     isLoggedIn = () => {
//         if (!this.state.pending && !this.state.authorized) {
//             this.window.history.push("/login")
//         } else if (!this.state.pending && this.state.authorized) {
//             return (<div></div>)
//         }
//     }

//     validateUser = () => {
//         fetch('http://localhost:3000/current_user', {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`
//             }
//         })
//         .then(res => {
//             return res.json()})
//         .then(json => {
//             console.log(json)
//             if (json.error) {
//                 this.setState({authorized: false})
//             } else {
//                 this.setState({authorized: true, pending: false})
//             }
//         })
//     }

//     componentDidMount() {
//         this.validateUser()
//     }

//     render() {
//         console.log(this.props)
//         return (
//             <Fragment>
//                 {this.isLoggedIn()}
//             </Fragment>
//     )}
// }

// export default AuthWrapper