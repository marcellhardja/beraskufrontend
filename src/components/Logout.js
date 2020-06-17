import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {logout} from './UserFunction'

class Logout extends Component{
    componentDidMount(){
        logout()
        this.props.history.push('/login')
        window.location.reload('false')
    }
    render(){
        return(
            <h1>Logging out...</h1>
        )
    }
}

export default Logout;