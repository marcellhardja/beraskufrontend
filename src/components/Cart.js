import React, {Component} from 'react'
import '../css/Landing.css';
import '../css/Landingstyle.css';
import {getCart, deleteCart, deleteCartAll, getProfile, getProductpic, getPosts} from './UserFunction'
import { createPortal } from 'react-dom';

class Cart extends Component{
    constructor(){
        super()
        this.state = {
            userId: '',
            cartProductId: {},
            postTitle: {},
            postImage:{},
            productPrice: '',
            quantity: '',
            totalPrice: '',
            cart: [],
            itemCart: []
        }
    }

    setProductpic = cart =>{
        cart.map(result=>{
            try{
            Object.entries(result.productId).map((key, value)=>{
                getProductpic(key[0]).then(res=>{
                    this.setState(prevState => ({
                      postImage: {                   // object that we want to update
                          ...prevState.postImage,    // keep all other key-value pairs
                          [key[0]]: res.productImageURL[0]       // update the value of specific key
                      }
                  }))
                  })
            })
        }
        catch(e){
            console.log(e)
        }
        })
      }

      getPic = id =>{
        return this.state.postImage[id]
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

    setTotal = cart =>{
        cart.map(result=>{
          this.setState({
              totalPrice: result.totalPrice
          })
        })
      }

      decreaseQty = (productID, accountID) =>{
          deleteCart(productID, accountID)
          window.location.reload('false')
      }

      removeQty = (productID, accountID) =>{
          deleteCartAll(productID, accountID)
          window.location.reload('false')
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
                this.setProductpic(res)
            })
        })
        .catch(err=>{
            alert('please log in first')
            this.props.history.push('/login')
        })
    }
    render(){
        const Carts = []
        this.state.cart.map(cartresult=>{
            try{
            cartresult.map(result=>{
                Object.entries(result.productId).map((key, value)=>{
                    Carts.push(
                        <tr>
                            <th scope="row">
                                <img src={this.getPic(key[0])} alt="" className="img-fluid z-depth-0" />
                            </th>
                            <td>
                                <h5 className="mt-3">
                                <strong>{this.getPostTitle(key[0])}</strong>
                                </h5>
                            </td>
                            <td>{key[1].item.riceType}</td>
                            <td />
                            <td>{key[1].item.price}</td>
                            <td>
                                {key[1].quantity} <button className="ml-2 btn-primary" title="Decrease item" onClick={()=>{this.decreaseQty(key[0], this.state.userId)}}><i className="fa fa-caret-down"></i></button>
                            </td>
                            <td className="font-weight-bold">
                                <strong>{key[1].price}</strong>
                            </td>
                            <td>
                                <button type="button" className="btn btn-sm btn-primary" data-toggle="tooltip" data-placement="top" title="Remove item" onClick={() => {this.removeQty(key[0], this.state.userId)}}>X
                                </button>
                            </td>
                            </tr>
                    )
                })
            
            })
        } catch(err){
            console.log(err)
            alert('Cart is currently empty')
            this.props.history.push('/')
        }

        })
        return(
            <div style={{paddingTop:100}}>
                <div className="card">
                    <div className="card-body">
                    {/* Shopping Cart table */}
                    <div className="table-responsive">
                        <table className="table product-table">
                        {/* Table head */}
                        <thead className="mdb-color lighten-5">
                            <tr>
                            <th />
                            <th className="font-weight-bold">
                                <strong>Product</strong>
                            </th>
                            <th className="font-weight-bold">
                                <strong>Color</strong>
                            </th>
                            <th />
                            <th className="font-weight-bold">
                                <strong>Price</strong>
                            </th>
                            <th className="font-weight-bold">
                                <strong>QTY</strong>
                            </th>
                            <th className="font-weight-bold">
                                <strong>Amount</strong>
                            </th>
                            <th />
                            </tr>
                        </thead>
                        {/* /.Table head */}
                        {/* Table body */}
                        <tbody>
                            {/* First row */}
                            {Carts}
                            {/* /.First row */}
                            {/* Fourth row */}
                            <tr>
                            <td colSpan={3} />
                            <td>
                                <h4 className="mt-2">
                                <strong>Total</strong>
                                </h4>
                            </td>
                            <td className="text-right">
                                <h4 className="mt-2">
                                <strong>{this.state.totalPrice}</strong>
                                </h4>
                            </td>
                            <td colSpan={3} className="text-right">
                                <button type="button" className="btn btn-primary btn-rounded" onClick={() => this.props.history.push('/payment')}>Complete purchase
                                <i className="fas fa-angle-right right" />
                                </button>
                            </td>
                            </tr>
                            {/* Fourth row */}
                        </tbody>
                        {/* /.Table body */}
                        </table>
                    </div>
                    {/* /.Shopping Cart table */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;