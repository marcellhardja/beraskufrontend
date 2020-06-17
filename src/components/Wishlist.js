import React, {Component} from 'react'
import '../css/Landing.css';
import '../css/Landingstyle.css';
import {getWishlist, getProfile, getPost, getProductpic, deleteWishlist, addtoCart} from './UserFunction'

class Wishlist extends Component{
    constructor(){
        super()
        this.state = {
            wishlists: [],
            postName: {},
            postPrice:{},
            postImage:{},
            productId: {}
        }
    }

    mapPostName = wishlist =>{
      wishlist.map(result=>{
        getPost(result.postId).then(res=>{
          this.setState(prevState => ({
            postName: {                   // object that we want to update
                ...prevState.postName,    // keep all other key-value pairs
                [result.postId]: res.data.postTitle       // update the value of specific key
            }
        }))
        })
      })
    }

    getPostTitle = id =>{
      // console.log(this.state.postImage)
      return this.state.postName[id]
    }

    mapPostPrice = wishlist =>{
      wishlist.map(result=>{
        getPost(result.postId).then(res=>{
          this.setState(prevState => ({
            postPrice: {                   // object that we want to update
                ...prevState.postPrice,    // keep all other key-value pairs
                [result.postId]: res.data.price       // update the value of specific key
            }
        }))
        })
      })
    }

    getPostPrice = id =>{
      // console.log(this.state.postImage)
      return this.state.postPrice[id]
    }

    mapPostpic = wishlist =>{
      wishlist.map(result=>{
        getPost(result.postId).then(res=>{
          getProductpic(res.data.productId).then(res=>{
            this.setState(prevState => ({
              postImage: {                   // object that we want to update
                  ...prevState.postImage,    // keep all other key-value pairs
                  [result.postId]: res.productImageURL[0]       // update the value of specific key
              }
          }))
          })
        })
      })
    }

    mapProductId = wishlist =>{
      wishlist.map(wishlistresult=>{
        getPost(wishlistresult.postId).then(res=>{
          console.log(res.data.productId)
          this.setState(prevState => ({
            productId: {                   // object that we want to update
                ...prevState.productId,    // keep all other key-value pairs
                [wishlistresult.postId]: res.data.productId       // update the value of specific key
            }
        }))
        // console.log(res.productImageURL[0])
        })
      })
    }

    deleteWishlistreload(id){
      deleteWishlist(id)
      window.location.reload('false')
    }

    getProductid = id =>{
      // console.log(this.state.postImage)
      return this.state.productId[id]
    }

    getPostPic = id =>{
      // console.log(this.state.postImage)
      return this.state.postImage[id]
    }

    componentDidMount(){
        getProfile().then(res=>{
          getWishlist(res.id).then(res=>{
            if(res.length == 0){
              alert('wishlist is empty')
              this.props.history.push('/')
            }
            this.setState({
              wishlists: [res]
            })
            this.mapPostName(res)
            this.mapPostPrice(res)
            this.mapPostpic(res)
            this.mapProductId(res)
          })
        })
    }
    render(){
      const Wishlist =[]
      this.state.wishlists.map(wishlistresult=>{
        wishlistresult.map(result=>{
          Wishlist.push(
            <div className="col-md-4 mb-5">
                {/* Card */}
                <div className>
                  <div className="card">
                    <img className="img-fluid w-100" src={this.getPostPic(result.postId)} />
                  </div>
                  <div className="text-center pt-4">
                    <h5>{this.getPostTitle(result.postId)}</h5>
                    <h6 className="mb-3">Rp. {this.getPostPrice(result.postId)}</h6>
                    <button type="button" className="btn btn-primary btn-sm mr-1 mb-2" onClick={()=> addtoCart(this.getProductid(result.postId), result.accountId)}><i className="fas fa-shopping-cart pr-2" />Add to cart</button>
                    <button type="button" className="btn btn-light btn-sm mr-1 mb-2" onClick={()=> this.props.history.push(`/productPage/${result.postId}`)}><i className="fas fa-info-circle pr-2"/>Details</button>
                    <button type="button" className="btn btn-elegant btn-sm px-3 mb-2 material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Remove from wishlist" onClick={()=> deleteWishlist(result.id)}><i className="fas fa-times" /></button>
                  </div>
                </div>
                {/* Card */}
              </div>
          )
        })
      })
        return(
            <div style={{paddingTop:100}}>
                <section>
            {/* Grid row */}
            <div className="row">
              {Wishlist}
            </div>
            {/* Grid row */}
          </section>
            </div>
            
        )
    }
}

export default Wishlist;