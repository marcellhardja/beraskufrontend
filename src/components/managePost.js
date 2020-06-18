import React, {Component} from 'react'
import '../css/Landing.css';
import '../css/Landingstyle.css';
import {getProducts, getPosts, getProductpic, productSearch, getProfile, deletePost} from './UserFunction'

class managePost extends Component{
    constructor(){
        super()
        this.state = {
            postTitle: '',
            postGrade: '',
            postPrice: '',
            products: [],
            posts: [],
            postID: '',
            postImage: {},
            sortBool: '',
            riceType:'',
            userId: ''
            
        }
    }

    mapProduct = product =>{
        product.map(productresult=>{
          getProductpic(productresult.id).then(res=>{
            // console.log(res)
            this.setState(prevState => ({
              postImage: {                   // object that we want to update
                  ...prevState.postImage,    // keep all other key-value pairs
                  [productresult.id]: res.productImageURL[0]       // update the value of specific key
              }
          }))
          // console.log(res.productImageURL[0])
          })
        })
      }
  
      getPicture = id =>{
        // console.log(this.state.postImage)
        return this.state.postImage[id]
      }

      deletePostReload(id){
          deletePost(id)
          window.location.reload()
      }

    componentDidMount(){
        getProfile().then(res=>{
            this.setState({
                userId: res.id
            })
        })

        getProducts().then(res=>{
          this.setState({
            products:[res.data]
          })
          this.mapProduct(res.data)
        })
        .catch(err=>{
          alert('There has been an error')
        })
  
        getPosts().then(res=>{
          this.setState({
            posts:[res.data],
            postID: res.data.id
          })
        })  
        .catch(err=>{
          console.log(err)
        })
      }
    render(){
        const Posting = []
        this.state.posts.map(post=>{
            post.map(postresult=>{
                if(this.state.userId == postresult.userId){
                    Posting.push(<div className="col-lg-3 col-md-6 mb-4">
              {/*Card*/}
              <div className="card">
                {/*Card image*/}
                <div className="view overlay">
                  <img src={this.getPicture(postresult.productId)} className="card-img-top" alt="" />
                  <a>
                    <div className="mask rgba-white-slight" />
                  </a>
                </div>
                {/*Card image*/}
                {/*Card content*/}
                <div className="card-body text-center">
                  {/*Category & Title*/}
                  <h5>
                    <strong>
                      <a href className="dark-grey-text">{postresult.postTitle}
                      </a>
                    </strong>
                  </h5>
                  <h4 className="font-weight-bold blue-text">
                <strong>Rp. {postresult.price}</strong>
                  </h4>
                </div>
                {/*Card content*/}
                <button type="button" className="btn btn-success btn-sm mr-1 mb-2" onClick={()=> this.props.history.push(`/updatepost/${postresult.id}`)}><i className="fas fa-shopping-cart pr-2"/>Update</button>
                    <button type="button" className="btn btn-danger btn-sm mr-1 mb-2" onClick={()=> this.deletePostReload(postresult.id)}><i className="fas fa-info-circle pr-2"/>Delete</button>
              </div>
              {/*Card*/}
            </div>)
                }
            })
        })
        return(
            <div style={{paddingTop:100}}>
                <section>
            {/* Grid row */}
            <div className="row">
                {Posting}
            </div>
            {/* Grid row */}
          </section>
            </div>
        )
    }
}

export default managePost;
