import React, {Component} from 'react'
import '../css/Landing.css';
import '../css/Landingstyle.css';
import {getProducts, getPosts, getProductpic, productSearch} from './UserFunction'
import Select from 'react-select'
import { isCompositeComponent } from 'react-dom/test-utils';

const sortOptions = [
  {value: 'ascend', label: 'Price (Lowest - Highest)'},
  {value: 'descend', label: 'Price (Highest - Lowest)'},
]

const riceTypeOptions = [
  {value: 'jasmani', label: 'Jasmani'},
  {value: 'basmani', label:'Basmani'}
]

class Landing extends Component{

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
            riceTypeBool: ''
        }
        this.sortAsc = this.sortAsc.bind(this)
        this.sortDes = this.sortDes.bind(this)
    }

    mapProduct = product =>{
      product.map(productresult=>{
        getProductpic(productresult.id).then(res=>{
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

    sortAsc = post =>{
      post.map(postresult=>{
        postresult.sort((a,b)=>(a.price > b.price)? 1 : -1 )
      })
    }

    sortDes = post =>{
      post.map(postresult=>{
        postresult.sort((a,b)=>(a.price < b.price)? 1 : -1 )
      })
    }

    filterJasmani = product =>{
      product.map(productresult =>{
        productresult.filter(result => result.riceType === "Jasmine").map(filteredresult =>{
          console.log(filteredresult)
        })
      })
    }

    handleChange = sortType => {
      this.setState({sortType, sortBool: sortType});
  }

  riceTypeHandleChange = riceType => {
    this.setState({riceType, riceTypeBool: riceType});
}


    componentDidMount(){
      getProducts().then(res=>{
        this.setState({
          products:[res.data]
        })
        this.mapProduct(res.data)
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
      this.filterJasmani(this.state.products)
      const Posting = []
      if(this.state.sortBool.value === "ascend"){
        this.sortAsc(this.state.posts)
      }
      else if(this.state.sortBool.value === "descend"){
        this.sortDes(this.state.posts)
      }
      this.state.posts.map(post=>{
        post.map(postresult=>{
          // console.log(postresult)
          // console.log(postresult.productId)
          Posting.push(<div className="col-lg-3 col-md-6 mb-4">
          {/*Card*/}
          <div className="card" onClick={() => this.props.history.push(`/productPage/${postresult.id}`)}>
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
                    <span className="badge badge-pill danger-color">{postresult.id}</span>
                  </a>
                </strong>
              </h5>
              <h4 className="font-weight-bold blue-text">
            <strong>Rp. {postresult.price}</strong>
              </h4>
            </div>
            {/*Card content*/}
          </div>
          {/*Card*/}
        </div>)
        })
      })
      
        return(
            <main>
        <div className="container">
        <div style={{paddingTop:70}}>
        {/*Navbar*/}
         <nav className="navbar navbar-expand-lg navbar-dark mdb-color mt-3 mb-5">
            {/* Navbar brand */}
            <span className="navbar-brand">Categories:</span>
            {/* Collapse button */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            {/* Collapsible content */}
            <div className="collapse navbar-collapse" id="basicExampleNav">
              {/* Links */}
              {/* <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">All
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Rice Type</a>
                <Select
                         name="riceType"
                         value={this.state.riceTypeBool}
                         onChange={this.riceTypeHandleChange}
                         options={riceTypeOptions}
                         placeholder="Rice Type"
                        />
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Grade</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Texture</a>
                </li>
              </ul> */}
              {/* Links */}
              <div className="d-inline col-2">
              <Select
                         name="riceType"
                         value={this.state.riceTypeBool}
                         onChange={this.riceTypeHandleChange}
                         options={riceTypeOptions}
                         placeholder="Rice Type"
                        />
              </div>
              <div className="d-inline col-2">
              <Select
                         name="riceType"
                         value={this.state.riceTypeBool}
                         onChange={this.riceTypeHandleChange}
                         options={riceTypeOptions}
                         placeholder="Rice Type"
                        />
              </div>
              <div className="d-inline col-2">
              <Select
                         name="riceType"
                         value={this.state.riceTypeBool}
                         onChange={this.riceTypeHandleChange}
                         options={riceTypeOptions}
                         placeholder="Rice Type"
                        />
              </div>
              <div className="d-inline col-4 ml-5">
              <Select
                         name="sortType"
                         value={this.state.sortBool}
                         onChange={this.handleChange}
                         options={sortOptions}
                         placeholder="Sort Price"
                        />
              </div>
              {/* <div className="d-inline">
                <i className="fas fa-filter text-white"></i>
                <a href="#" className="text-white ml-1">Filter</a>
              </div> */}
              {/* <form className="form-inline">
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </form> */}
            </div>
            {/* Collapsible content */}
          </nav>
          {/*/.Navbar*/}
        </div>
          
          {/* Section: Products v.3 */}
          <section className="text-center mb-4">
            {/*Grid row*/}
            <div className="row wow fadeIn">
              {Posting}
            </div>
            {/*Grid row*/}
          </section>
          {/*Section: Products v.3 */}
          {/*Pagination*/}
          <nav className="d-flex justify-content-center wow fadeIn">
            <ul className="pagination pg-blue">
              {/*Arrow left*/}
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1
                  <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">4</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">5</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
          {/*Pagination*/}
        </div>
      </main>
        )
    }
}

export default Landing;