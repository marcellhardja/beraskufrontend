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
  {value: 'Jasmani', label: 'Jasmani'},
  {value: 'Basmani', label:'Basmani'}
]

const riceGradeOptions = [
  {value: 'a', label: 'A'},
  {value: 'b', label: 'B'},
  {value: 'c', label: 'C'}
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
            riceType:'',
            searchBool:'',
            searchResult: [],
            inputSearch:{}
        }
        this.sortAsc = this.sortAsc.bind(this)
        this.sortDes = this.sortDes.bind(this)
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

    // filterJasmani = product =>{
    //   product.map(productresult =>{
    //     productresult.filter(result => result.riceType === "Jasmine").map(filteredresult =>{
    //       console.log(filteredresult)
    //     })
    //   })
    // }

    handleChange = sortType => {
      this.setState({sortType, sortBool: sortType});
  }

    riceTypeHandleChange = riceType => {
      this.setState({riceType, riceType: riceType});
  }

  onChange(e) {
    this.setState({ riceType: e.target.value})
}
  


    componentDidMount(){

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
      if(this.state.sortBool.value === "ascend"){
        this.sortAsc(this.state.posts)
      }
      else if(this.state.sortBool.value === "descend"){
        this.sortDes(this.state.posts)
      }
      this.state.posts.map(post=>{
        post.map(postresult=>{
          console.log(postresult.productId)
          console.log(this.getPicture(postresult.productId))
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
                  </a>
                </strong>
              </h5>
              <h4 className="font-weight-bold green-text">
            <strong>Rp. {postresult.price}</strong>
              </h4>
            </div>
            {/*Card content*/}
          </div>
          {/*Card*/}
        </div>)
        })
      })
      console.log(this.state.riceType)
        return(
            <main>
        <div className="container">
        <div style={{paddingTop:70}}>
            <nav className="navbar navbar-expand-lg bg-success mt-3 mb-5">
            {/* Navbar brand */}
            {/* Collapse button */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav" aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            {/* Collapsible content */}
            <div className="collapse navbar-collapse" id="basicExampleNav">
              {/* Links */}
              <ul className="navbar-nav mr-auto">
                
              </ul>
              {/* Links */}

              <div className="col-3">
                    <Select
                         name="sortType"
                         value={this.state.sortBool}
                         onChange={this.handleChange}
                         options={sortOptions}
                         placeholder="Sort Price"
                        />
                    </div>

            </div>
            {/* Collapsible content */}
          </nav>
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