import React, {Component} from 'react'
import {getProfile, isShop, getCart} from './UserFunction'
import {Link} from 'react-router-dom'

class Navbar extends Component{
  constructor(){
    super()
    this.state = {
        login:'',
        addPost_cart: '',
        managePost: ''
    }
}

setQuantityCart = cart =>{
  cart.map(result=>{
    this.setState({
        cartQuantity: result.totalQuantity
    })
  })
}

componentDidMount(){
    getProfile().then(res=>{
        console.log(res.firstName)
        if(isShop){
          this.setState({
            addPost_cart: <li className="nav-item"><Link to="/addpost" className="nav-link border border-light rounded waves-effect mr-3">
            <i className="fa fa-upload" />
            <span className="clearfix d-none d-sm-inline-block ml-2"> Add Post</span>
          </Link></li>,
          managePost: <li className="nav-item"><Link to="/managepost" className="nav-link border border-light rounded waves-effect mr-3">
          <i className="fa fa-tasks" />
          <span className="clearfix d-none d-sm-inline-block ml-2"> Manage Post</span>
        </Link></li>
          
          })
        }

        getCart(res.id).then(res=>{
          this.setQuantityCart(res)
        })

        this.setState({
            login: <Link to="/logout" className="nav-link border border-light rounded waves-effect"><i className="fas fa-sign-out-alt"></i> Logout</Link>,
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
                <Link to="/profile" className="nav-link waves-effect" >Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/wishlist" className="nav-link waves-effect">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link to="/history" className="nav-link waves-effect">History</Link>
              </li>
            </ul>
            {/* Right */}
            <ul className="navbar-nav nav-flex-icons">
            <li className="nav-item">
              <Link to="/cart" className="nav-link waves-effect">
                <span className="badge red z-depth-1 mr-1"> {this.state.cartQuantity} </span>
                <i className="fas fa-shopping-cart" />
                <span className="clearfix d-none d-sm-inline-block mr-2 "> Cart </span>
              </Link>
              </li>
                {this.state.addPost_cart}
                {this.state.managePost}

              
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