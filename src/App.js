import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Landing from './components/Landing'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import UpdateProfile from './components/UpdateProfile'
import AddPost from './components/AddPost'
import Test from './components/Test'
import Logout from './components/Logout'
import ProductPage from './components/productPage'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'
import Payment from './components/Payment'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path ="/login" component={Login}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/updateprofile" component={UpdateProfile}></Route>
        <Route exact path="/addpost" component={AddPost}></Route>
        <Route exact path="/test" component={Test}></Route>
        <Route exact path="/logout" component={Logout}></Route>
        <Route exact path="/productpage/:id" component={ProductPage}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/wishlist" component={Wishlist}></Route>
        <Route exact path="/payment" component={Payment}></Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
