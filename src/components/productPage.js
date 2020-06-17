import React, {Component} from 'react'
import '../css/Landing.css';
import '../css/Landingstyle.css';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { getPost, getProduct, getProductpic, addtoCart, getProfile, addComment, getComment, getAccount, addtoWishlist, getProfilePic} from './UserFunction';

class productPage extends Component{
    constructor(){
        super()
        this.state = {
            postId: '',
            postTitle:'',
            postPrice: '',
            postDescription: '',
            productGrade: '',
            productTexture: '',
            productShape: '',
            productColor: '',
            productType: '',
            productQuantity: '',
            productPic: [],
            productId: '',
            userId: '',
            sellerName:'',
            commentPost:'',
            userComment: [],
            commentatorName: {},
            commentatorPic: {}

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.CartSubmit = this.CartSubmit.bind(this)
        this.addWishlist = this.addWishlist.bind(this)
    }

    mapCommentator = user =>{
      user.map(result=>{
        getAccount(result.commentatorId).then(res=>{
          this.setState(prevState => ({
            commentatorName: {                   // object that we want to update
                ...prevState.commentatorName,    // keep all other key-value pairs
                [result.commentatorId]: res.data.firstName       // update the value of specific key
            }
        }))
        // console.log(res.productImageURL[0])
        })
      })
    }

    getCommentatorName = id =>{
      // console.log(this.state.postImage)
      return this.state.commentatorName[id]
    }

    mapCommentatorPic = comment =>{
      comment.map(result=>{
        getProfilePic(result.commentatorId).then(res=>{
          this.setState(prevState => ({
            commentatorPic: {                   // object that we want to update
                ...prevState.commentatorPic,    // keep all other key-value pairs
                [result.commentatorId]: res.imageURL       // update the value of specific key
            }
        }))
        })
        .catch(err=>{
          console.log(err)
        })
      })
    }

    getCommentatorPic = id =>{
      return this.state.commentatorPic[id]
    }

    componentDidMount(){
        getPost(this.props.match.params.id).then(res=>{
            this.setState({
                postTitle: res.data.postTitle,
                postDescription: res.data.postDescription,
                postPrice: res.data.price,
                productId: res.data.productId,
                postUser: res.data.userId
            })
            getAccount(res.data.userId).then(res=>{
              this.setState({
                sellerName: res.data.firstName
              })
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })

            getProduct(res.data.productId).then(res=>{
                this.setState({
                    productGrade: res.data.riceGradeType,
                    productTexture: res.data.riceTextureType,
                    productShape: res.data.riceShapeType,
                    productColor: res.data.riceColorType,
                    productType: res.data.riceType,
                    productQuantity: res.data.riceQuantity
                })
            })
            getProductpic(res.data.productId).then(res=>{
                this.setState({
                    productPic: [res.productImageURL]
                })
            })
        })
        .catch(err=>{
            console.log(err)
        })  

      getProfile().then(res=>{
        this.setState({
          userId: res.id
        })
      })
      .catch(err=>{
        alert('You need to log in to continue')
        this.props.history.push('/login')
      })

      getComment(this.props.match.params.id).then(res=>{
        this.setState({
          userComment: [res]
        })
        this.mapCommentator(res)
        this.mapCommentatorPic(res)
      })
    }

    onChange(e) {
      this.setState({commentPost: e.target.value})
  }

    onSubmit(e) {
      e.preventDefault()

      const newComment = {
          postId: this.props.match.params.id,
          commentatorId: this.state.userId,
          comment: this.state.commentPost
      }

      addComment(newComment).then(res => {
          alert('Comment has been added')
          window.location.reload('false');
      })
  }

  CartSubmit(e){
    e.preventDefault()

    addtoCart(this.state.productId, this.state.userId).then(res=>{
      alert('Item has been added to Cart')
    })
  }

  addWishlist(e){
    e.preventDefault()

    const newWishlist = {
      postId: this.props.match.params.id,
      accountId: this.state.userId
    }

    addtoWishlist(newWishlist).then(res=>{
      alert('Added to wishlist')
    })
  }
    render(){
      const showComment = []
      this.state.userComment.map(comment=>{
        comment.map(result=>{
          showComment.push( 
          <div className="card mb-3">
          {/* Comment Row */}
            <div className="d-flex flex-row comment-row m-t-0">
              <div className="p-2 d-inline"><img src={this.getCommentatorPic(result.commentatorId)} alt="user" width={50} className="rounded-circle" /></div>
                <h6 className="font-medium mt-3">{this.getCommentatorName(result.commentatorId)}</h6>
              <div className="comment-text w-100">
               <span className="m-b-15 d-block mt-4">{result.comment} </span>
               <span className="text-muted float-right">April 14, 2019</span>  
              </div>
            </div> {/* Comment Row */}
          </div>
      )
        })
      })
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
        const PostPic = []
        this.state.productPic.map(res=>{
          for(var i = 0; i < res.length; i++){
            PostPic.push(<div><img src={res[i]} alt="Image" className="img-fluid" style={{paddingLeft:150}}/></div>)
          }
        })
        return(
            <div>
        {/*Main layout*/}
        <main className="mt-5 pt-4">
          <div className="container dark-grey-text mt-5">
            {/*Grid row*/}
            <div className="row wow fadeIn">
              {/*Grid column*/}
              <div className="col-md-6 mb-4">
                <div style={{paddingLeft:130}}>
                  <h1 className="mb-3 font-weight-bold">{this.state.postTitle}</h1>
                </div>
                <Slider {...settings}>
                    {PostPic}
                    {/* <div><img src="http://berasku.s3-ap-southeast-1.amazonaws.com/productImage/zLaBG8PnWY6wwO6ibKGYGPViRFJQCqIKZyu1mWEB.jpeg" alt="Image" className="img-fluid" style={{paddingLeft:150}}/></div>
                    <div><img src="http://berasku.s3-ap-southeast-1.amazonaws.com/productImage/zLaBG8PnWY6wwO6ibKGYGPViRFJQCqIKZyu1mWEB.jpeg" alt="Image" className="img-fluid" style={{paddingLeft:150}}/></div> */}
                </Slider>
              </div>
              {/*Grid column*/}
              {/*Grid column*/}
              <div className="col-md-6 mb-4">
                {/*Content*/}
                <div className="p-4">
                  <div className="mb-3">
                      <h5 className="font-weight-bold d-inline">Rice Grade: </h5>
                        <h5 className="d-inline pl-3">{this.state.productGrade}</h5>
                    {/* <a href>
                      <span className="badge purple mr-1">{this.state.postTitle}</span>
                    </a>
                    <a href>
                      <span className="badge blue mr-1">New</span>
                    </a> */}
                    {/* <a href>
                      <span className="badge red mr-1">Bestseller</span>
                    </a> */}
                  </div>
                  <div className="mb-3">
                  <h5 className="font-weight-bold d-inline">Rice Type: </h5>
                        <h5 className="d-inline pl-3 ">{this.state.productType}</h5>
                  </div>
                  <p className="lead"> <strong>Rp. {this.state.postPrice}</strong></p>
                  <div className="mb-3">
                    <p className="lead font-weight-bold d-inline">Sold By: </p>
                    <p className="d-inline">{this.state.sellerName}</p>
                  </div>
                  <p className="lead font-weight-bold">Description</p>
                  <p>{this.state.postDescription}</p>
                  <form className="d-flex justify-content-left" onSubmit={this.CartSubmit}>
                    {/* Default input */}
                    <input type="number" defaultValue={1} aria-label="Search" className="form-control" style={{width: '100px'}} />
                    <button className="btn btn-primary btn-md my-0 p" type="submit" value="submit">Add to cart
                      <i className="fas fa-shopping-cart ml-1" />
                    </button>
                  </form>
                  <form onSubmit={this.addWishlist}>
                  <button className="btn btn-danger btn-md mt-5 p" type="submit">Add to Wishlist
                      <i className="fas fa-heart ml-1" />
                    </button>
                  </form>
                </div>
                {/*Content*/}
              </div>
              {/*Grid column*/}
            </div>
            {/*Grid row*/}
            <hr />
            {/*Grid row*/}
            <div className="row d-flex justify-content-center wow fadeIn">
              {/*Grid column*/}
              <div className="col-12 text-center">
                <h4 className="my-4 h4">Comments</h4>
                {showComment}
                <form className="md-form" onSubmit={this.onSubmit}>
                  <textarea name="commentPost" className="md-textarea form-control" placeholder="Add your comments" rows="5" value={this.state.comment} onChange={this.onChange}></textarea>
                  <button type="submit" class="btn btn-grey btn-rounded z-depth-1a">Send</button>
                </form>
              </div>
              {/*Grid column*/}
            </div>
            {/*Grid row*/}
            {/*Grid row*/}
            {/*Grid row*/}
          </div>
        </main>
      </div>
            
        )
    }
}

export default productPage;