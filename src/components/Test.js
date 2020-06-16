import React, {Component} from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import {getProduct, getProductpic, getPost} from './UserFunction'

class Test extends Component{
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
        productPic: []

    }
}

componentDidMount(){
    getPost(this.props.match.params.id).then(res=>{
        this.setState({
            postTitle: res.data.postTitle,
            postDescription: res.data.postDescription,
            postPrice: res.data.price
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
                productPic: [res.imageURL]
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
  }

    render(){
      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
        return(
          <Slider {...settings}>
        <div>
          <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg" alt=""/>
        </div>
        <div>
          <img src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/14.jpg" alt=""/>
        </div>
      </Slider>
           
        )
    }
}

export default Test;