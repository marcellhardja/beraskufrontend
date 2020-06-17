import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import '../css/Landing.css';
import '../css/Landingstyle.css';
import {checkout, getCart, getProfile, getProduct, getPosts} from './UserFunction'

class Payment extends Component{
    constructor(){
        super()
        this.state = {
            userId: '',
            name: '',
            totalPrice: '',
            email: '',
            description: "rice purchasement",
            address:'',
            cart: [],
            postTitle: {},
            cartQuantity: ''
        }
        this.onChange = this.onChange.bind(this)
        this.handleToken = this.handleToken.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleToken(token){
        const newcheckout = {
            name: this.state.name,
            stripeToken: token.id,
            email: token.email,
            description: this.state.description,
            address: this.state.address,
            amount: this.state.totalPrice
        }
        checkout(newcheckout, this.state.userId).then(res=>{
            alert('Payment successful')
            this.props.history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
        console.log(token)
        
    }
    setTotal = cart =>{
        cart.map(result=>{
          this.setState({
              totalPrice: result.totalPrice
          })
        })
      }

      setQuantity = cart =>{
        cart.map(result=>{
          this.setState({
              cartQuantity: result.totalQuantity
          })
        })
      }

      setPostTitle = cart =>{
        const productID = []
        cart.map(result=>{
            // console.log(result)
          getPosts().then(res=>{
              productID.push(res.data)
              try{
              Object.entries(result.productId).map((key,value)=>{
                  productID.map(productresult=>{
                      productresult.map(finalproductresult=>{
                        if(finalproductresult.productId == key[0]){
                            this.setState(prevState => ({
                                postTitle: {                   // object that we want to update
                                    ...prevState.postTitle,    // keep all other key-value pairs
                                    [key[0]]: finalproductresult.postTitle       // update the value of specific key
                                }
                            }))
                        }
                      })
                  })
              })
            }
            catch(e){
                console.log(e)
            }
          })
        })
      }

      getPostTitle = id =>{
        return this.state.postTitle[id]
      }

    componentDidMount(){
        getProfile().then(res=>{
            this.setState({
                userId: res.id
            })
            getCart(res.id).then(res=>{
                this.setState({
                    cart: [res]
                })
                this.setTotal(res)
                this.setPostTitle(res)
                this.setQuantity(res)
            })
        })
    }
    
    render(){
        const Cart = []
        this.state.cart.map(cartresult=>{
            cartresult.map(result=>{
              try{
                Object.entries(result.productId).map((key,value)=>{
                  Cart.push(
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">{this.getPostTitle(key[0])}</h6>
                  <small className="text-muted">{key[1].item.riceType}</small>
                </div>
                  <span className="text-muted">Rp. {key[1].price}</span>
              </li>
                  )
              })
              }
              catch{
                alert('There is nothing in the cart')
                this.props.history.push('/')
              }
                
            })
        })
        return(
            // <div style={{paddingTop:100}}>
            //     <div className="container">
                    
            //     </div>
            // </div>
            
            <main className="mt-5 pt-4">
        <div className="container wow fadeIn">
          {/* Heading */}
          <h2 className="my-5 h2 text-center">Checkout form</h2>
          {/*Grid row*/}
          <div className="row">
            {/*Grid column*/}
            <div className="col-md-8 mb-4">
              {/*Card*/}
              <div className="card">
                {/*Card content*/}
                <div className="card-body">
                  {/*Grid row*/}
                  {/*Username*/}
                  
                  <div className="md-form mb-5">
                    <input type="text" name="name" className="form-control py-0" placeholder="Name" aria-describedby="basic-addon1" onChange={this.onChange} />
                  </div>
                  {/*address*/}
                  <div className="md-form mb-5">
                    <input type="text" name="address" id="address" className="form-control" placeholder="Address" onChange={this.onChange}/>
                  </div>
                  {/*Grid row*/}
                  <div className="row">
                    {/*Grid column*/}
                    <div className="col-lg-4 col-md-12 mb-4">
                      <label htmlFor="country">Country</label>
                      <select className="custom-select d-block w-100" id="country" required>
                        <option value>Choose...</option>
                        <option>United States</option>
                      </select>
                      <div className="invalid-feedback">
                        Please select a valid country.
                      </div>
                    </div>
                    {/*Grid column*/}
                    {/*Grid column*/}
                    <div className="col-lg-4 col-md-6 mb-4">
                      <label htmlFor="state">State</label>
                      <select className="custom-select d-block w-100" id="state" required>
                        <option value>Choose...</option>
                        <option>California</option>
                      </select>
                      <div className="invalid-feedback">
                        Please provide a valid state.
                      </div>
                    </div>
                    {/*Grid column*/}
                    {/*Grid column*/}
                    <div className="col-lg-4 col-md-6 mb-4">
                      <label htmlFor="zip">Zip</label>
                      <input type="text" className="form-control" id="zip" placeholder required />
                      <div className="invalid-feedback">
                        Zip code required.
                      </div>
                    </div>
                    {/*Grid column*/}
                  </div>
                  
                  <hr className="mb-4" />
                  <StripeCheckout 
                    stripeKey="pk_test_4ONmbYXYxaIsxOLtjJmseNQV004gH0rYRR"
                    token={this.handleToken}
                    ></StripeCheckout>
                </div>
              </div>
              {/*/.Card*/}
            </div>
            {/*Grid column*/}
            {/*Grid column*/}
            <div className="col-md-4 mb-4">
              {/* Heading */}
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">{this.state.cartQuantity}</span>
              </h4>
              {/* Cart */}
              <ul className="list-group mb-3 z-depth-1">
                {Cart}
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (IDR)</span>
                    <strong>{this.state.totalPrice}</strong>
                </li>
              </ul>
              {/* Cart */}
            </div>
            {/*Grid column*/}
          </div>
          {/*Grid row*/}
        </div>
      </main>
        )
    }
}

export default Payment;