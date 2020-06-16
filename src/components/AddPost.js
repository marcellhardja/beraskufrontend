import React, {Component} from 'react'
import Select from 'react-select'
import {addPost, addProduct, getProfile, addProductpic} from './UserFunction'

const riceGradeOptions = [
    {value: 'A', label: 'A'},
    {value: 'B', label: 'B'},
    {value: 'C', label: 'C'}
]

const riceUnitOptions = [
    {value: 'kg', label: 'kg'},
    {value: 'litre', label: 'litre'}
]

var productIDtime = new Date().getTime()

class AddPost extends Component{
    constructor(){
        super()
        this.state = {
            userId: '',
            productId: productIDtime,
            postTitle: '',
            riceGradeType: null,
            riceType:'',
            riceShapeType:'',
            riceColorType: '',
            riceTextureType:'',
            riceQuantity:'',
            riceUnitType: null,
            price:'',
            postDescription:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        getProfile().then(res=>{
            this.setState({
                userId: res.id
            })
        })
        .catch(err=>{
            alert('You have been logged out')
            this.props.history.push('/login')
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    // ImageonChange = (e) =>{
    //     this.setState({
    //         profilePic: e.target.files[0]
    //     })
    // }

    riceGradehandleChange = riceGradeType => {
        this.setState({riceGradeType});
        console.log(riceGradeType.value);
    }

    riceUnithandleChange = riceUnitType => {
        this.setState({riceUnitType});
        console.log(riceUnitType.value);
    }

    onSubmit(e) {
        e.preventDefault()

        const newProduct = {
            id: this.state.productId,
            riceGradeType: this.state.riceGradeType.value,
            riceType: this.state.riceType,
            riceShapeType: this.state.riceShapeType,
            riceColorType:this.state.riceColorType,
            riceTextureType:this.state.riceTextureType,
            riceQuantity: this.state.riceQuantity,
            riceUnitType: this.state.riceUnitType.value,
            price: this.state.price
        }

        const newPost = {
            userId: this.state.userId,
            productId: this.state.productId,
            postTitle: this.state.postTitle,
            postDescription: this.state.postDescription
        }

        let form_data = new FormData();
        form_data.append('productId', this.state.id)
        form_data.append('profilePic', this.state.profilePic);

        addProduct(newProduct).then(res => {
            console.log(this.state.userId)
            addPost(newPost).then(res=>{
                this.props.history.push(`/`)
            })
        })
        .catch(err=>{
            console.log(err)
        }) 
    }

    render(){
        return(
            <div style={{paddingTop:100}}>
                 <div className="container">
                 <form noValidate onSubmit={this.onSubmit} className="text-center p-5">
                 <p className="h4 mb-5">Add Post</p>
                    <div className="form-row mb-4">
                    <input type="text" 
                        name="postTitle" 
                        className="form-control mb-4" 
                        placeholder="Post Title"
                        value={this.state.postTitle}
                        onChange={this.onChange}
                         />
                         <input type="text" 
                        name="postDescription" 
                        className="form-control mb-4" 
                        placeholder="Post Description"
                        value={this.state.postDescription}
                        onChange={this.onChange}
                         />
                    <input type="text" 
                        name="riceTextureType" 
                        className="form-control mb-4" 
                        placeholder="Rice Texture"
                        value={this.state.riceTextureType}
                        onChange={this.onChange}
                         />
                         <input type="text" 
                        name="riceColorType" 
                        className="form-control mb-4" 
                        placeholder="Rice Color"
                        value={this.state.riceColorType}
                        onChange={this.onChange}
                         />
                        <div className="col">
                        <Select
                         name="riceGradeType"
                         value={this.state.riceGradeType}
                         onChange={this.riceGradehandleChange}
                         options={riceGradeOptions}
                         placeholder="Rice Grade"
                        />
                        </div>

                        <div className="col">
                        <input type="text" 
                            name="riceType" 
                            className="form-control" 
                            placeholder="Rice Type"
                            value={this.state.riceType}
                            onChange={this.onChange} />
                        </div>

                    </div>

                    <div className="form-row mb-4">
                        <div className="col">
                        <input type="text" 
                            name="riceShapeType"
                            className="form-control" 
                            placeholder="Rice Shape" 
                            value={this.state.riceShapeType}
                            onChange={this.onChange} />
                        </div>

                        <div className="col">
                        <Select
                         name="riceUnitType"
                         value={this.state.riceUnitType}
                         onChange={this.riceUnithandleChange}
                         options={riceUnitOptions}
                         placeholder="Rice Unit"
                        />
                        </div>
                    </div>
                    

                    <input type="text" 
                        name="riceQuantity" 
                        className="form-control mb-4" 
                        placeholder="Rice Quantity"
                        value={this.state.riceQuantity}
                        onChange={this.onChange}
                         />

                    <input type="text" 
                        name="price" 
                        className="form-control" 
                        placeholder="Price" 
                        value={this.state.price}
                        onChange={this.onChange} />


                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="defaultRegisterFormNewsletter" />
                        <label className="custom-control-label" htmlFor="defaultRegisterFormNewsletter">Subscribe to our newsletter</label>
                    </div>

                    <button className="btn btn-info my-4 btn-block" type="submit">Sign in</button>
                    <p>or sign up with:</p>
                    <a href="#" className="mx-2" role="button"><i className="fab fa-facebook-f light-blue-text" /></a>
                    <a href="#" className="mx-2" role="button"><i className="fab fa-twitter light-blue-text" /></a>
                    <a href="#" className="mx-2" role="button"><i className="fab fa-linkedin-in light-blue-text" /></a>
                    <a href="#" className="mx-2" role="button"><i className="fab fa-github light-blue-text" /></a>
                    <hr />
                    <p>By clicking
                        <em> Sign up</em> you agree to our
                        <a href target="_blank">terms of service</a>
                    </p>
                 </form> 
                </div>
            </div>
        )
    }
}

export default AddPost;