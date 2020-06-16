import React, {Component} from 'react'
import {getProfile, isShop} from './UserFunction'
import {Link} from 'react-router-dom'

class Navbar extends Component{
  constructor(){
    super()
    this.state = {
        login:'',
        addPost_cart: ''
    }
}

componentDidMount(){
    getProfile().then(res=>{
        console.log(res.firstName)
        if(isShop){
          this.setState({
            addPost_cart: <a href="/addpost" className="nav-link border border-light rounded waves-effect mr-3">
            <i className="fa fa-upload" />
            <span className="clearfix d-none d-sm-inline-block ml-2"> Add Post</span>
          </a>
          })
        }
        else{
          this.setState({
            addPost_cart: <a href className="nav-link waves-effect">
            <span className="badge red z-depth-1 mr-1"> 1 </span>
            <i className="fas fa-shopping-cart" />
            <span className="clearfix d-none d-sm-inline-block">Cart</span>
          </a>
          })
        }

        this.setState({
            login: <a href="/logout" className="nav-link border border-light rounded waves-effect"><i className="fas fa-sign-out-alt"></i> Logout</a>,
        })
        })
        .catch(err=>{
          this.setState({
            login: <Link to="/login" className="nav-link border border-light rounded waves-effect"><i className="fas fa-sign-in-alt" aria-hidden="true"/> Login </Link>,
          })
        })
}
    render(){
     
        return(
            <nav className="navbar fixed-top navbar-expand-lg navbar-light white scrolling-navbar">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand waves-effect" href="/">
            <strong className="green-text">BERASKU</strong>
          </a>
          {/* Collapse */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Left */}
            <ul className="navbar-nav mr-auto">
              {/* <li className="nav-item">
                <a className="nav-link waves-effect" href="#">Home
                  <span className="sr-only">(current)</span>
                </a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link waves-effect" href="/profile">Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link waves-effect" href="/wishlist">Wishlist</a>
              </li>
            </ul>
            {/* Right */}
            <ul className="navbar-nav nav-flex-icons">
            <li className="nav-item">
              <a href="/cart" className="nav-link waves-effect">
                <span className="badge red z-depth-1 mr-1"> 1 </span>
                <i className="fas fa-shopping-cart" />
                <span className="clearfix d-none d-sm-inline-block mr-2 "> Cart </span>
              </a>
              </li>

              <li className="nav-item">
                {this.state.addPost_cart}
              </li>

              
              {/* <li className="nav-item">
                <a href="https://www.facebook.com/mdbootstrap" className="nav-link waves-effect" target="_blank">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="nav-item">
                <a href="https://twitter.com/MDBootstrap" className="nav-link waves-effect" target="_blank">
                  <i className="fab fa-twitter" />
                </a>
              </li> */}
              <li className="nav-item">
                  {this.state.login}
              </li>
            </ul>
          </div>
        </div>
      </nav>
        )
    }
}

export default Navbar;