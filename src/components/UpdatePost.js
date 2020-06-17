import React, {Component} from 'react'
import Select from 'react-select'
import {getProfile, addProductpic, getPost, getProduct, updatePost} from './UserFunction'

const riceGradeOptions = [
    {value: 'A', label: 'A'},
    {value: 'B', label: 'B'},
    {value: 'C', label: 'C'},
    {value: 'D', label: 'D'}
]

const riceUnitOptions = [
    {value: 'kg', label: 'kg'},
    {value: 'litre', label: 'litre'}
]

const riceTextureOptions = [
    {value: 'soft', label: 'Soft'},
    {value: 'sticky', label: 'Sticky'},
    {value: 'fluffy', label: 'Fluffy'},
    {value: 'chewy', label: 'Chewy'},
]

const riceTypeOptions = [
    {value: 'american', label: 'American'},
    {value: 'basmati', label:'Basmati'},
    {value: 'jasmine', label: 'Jasmine'},
    {value: 'japanese', label: 'Japanese'},
    {value: 'bomba', label: 'Bomba'},
    {value: 'arborio', label: 'Arborio'}
]

const riceColorOptions = [
    {value: 'white', label: 'White'},
    {value: 'brown', label: 'Brown'},
    {value: 'red', label: 'Red'},
]

const riceShapeOptions = [
    {value: 'long', label: 'Long-grain'},
    {value: 'medium', label: 'Medium-grain'},
    {value: 'short', label: 'Short-grain'},
    {value: 'round', label: 'Round-grain'}
]

class UpdatePost extends Component{
    constructor(){
        super()
        this.state = {
            userId: '',
            postTitle: '',
            price:'',
            postDescription:'',
            productImage: null,
            imagename: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.ImageonChange = this.ImageonChange.bind(this)
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

        getPost(this.props.match.params.id).then(res=>{
            console.log(res.data)
            this.setState({
                postTitle: res.data.postTitle,
                postDescription: res.data.postDescription,
                price: res.data.price
            })
        })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    ImageonChange = (e) =>{
        this.setState({
            productImage: e.target.files[0],
            imagename: e.target.files[0].name
        })
    }


    onSubmit(e) {
        e.preventDefault()

        const newPost = {
            userId: this.state.userId,
            productId: this.state.productId,
            postTitle: this.state.postTitle,
            postDescription: this.state.postDescription,
            price:this.state.price,
            countSold: 0
        }

        updatePost(newPost, this.props.match.params.id).then(res=>{
            console.log(res)
        })


        let form_data = new FormData();
        form_data.append('productId', this.state.productId)
        form_data.append('productImage', this.state.productImage);

        addProductpic(form_data).then(res=>{
            console.log(res)
        })

        this.props.history.push('/managepost')
        window.location.reload()

        
    }

    render(){
        return(
            <div style={{paddingTop:100}}>
                 <div className="container">
                 <form noValidate onSubmit={this.onSubmit} className="text-center p-5">
                 <p className="h4 mb-5">Update Post</p>
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
                        className="form-control" 
                        placeholder="Post Description"
                        value={this.state.postDescription}
                        onChange={this.onChange}
                         />
                    </div>

                    <input type="text" 
                        name="price" 
                        className="form-control mb-3" 
                        placeholder="Price" 
                        value={this.state.price}
                        onChange={this.onChange} />

                    <label htmlFor="defaultLoginFormEmail">Add more Product picture</label>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" name="productImage" accept="image/jpeg, image/png, image/jpg" onChange={this.ImageonChange} />
                        <label className="custom-file-label">{this.state.imagename}</label>
                        </div>
                    </div>

                    <button className="btn btn-success my-4 btn-block " type="submit">Update Post</button>
                 </form> 
                </div>
            </div>
        )
    }
}

export default UpdatePost;