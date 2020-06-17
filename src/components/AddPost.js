import React, {Component} from 'react'
import Select from 'react-select'
import {addPost, addProduct, getProfile, addProductpic} from './UserFunction'

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

var productIDtime = new Date().getTime()/1000

class AddPost extends Component{
    constructor(){
        super()
        this.state = {
            userId: '',
            productId: productIDtime,
            postTitle: '',
            riceGradeType: null,
            riceType:null,
            riceShapeType: null,
            riceColorType: null,
            riceTextureType: null,
            riceQuantity:'',
            riceUnitType: null,
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

    riceTypehandleChange = riceType => {
        this.setState({riceType});
    }

    riceGradehandleChange = riceGradeType => {
        this.setState({riceGradeType});
    }

    riceTexturehandleChange = riceTextureType => {
        this.setState({riceTextureType});
    }

    riceColorhandleChange = riceColorType => {
        this.setState({riceColorType});
    }

    riceShapehandleChange = riceShapeType => {
        this.setState({riceShapeType});
    }

    riceUnithandleChange = riceUnitType => {
        this.setState({riceUnitType});
    }

    onSubmit(e) {
        e.preventDefault()

        const newProduct = {
            id: this.state.productId,
            riceGradeType: this.state.riceGradeType.value,
            riceType: this.state.riceType.value,
            riceShapeType: this.state.riceShapeType.value,
            riceColorType:this.state.riceColorType.value,
            riceTextureType:this.state.riceTextureType.value,
            riceQuantity: this.state.riceQuantity,
            riceUnitType: this.state.riceUnitType.value,
            price: this.state.price
        }

        const newPost = {
            userId: this.state.userId,
            productId: this.state.productId,
            postTitle: this.state.postTitle,
            postDescription: this.state.postDescription,
            price:this.state.price,
            countSold: 0
        }


        let form_data = new FormData();
        form_data.append('productId', this.state.productId)
        form_data.append('productImage', this.state.productImage);

        addProductpic(form_data).then(res=>{
            console.log(res)
        })

        addProduct(newProduct).then(res => {
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
                        className="form-control" 
                        placeholder="Post Description"
                        value={this.state.postDescription}
                        onChange={this.onChange}
                         />
                    </div>

                    <div className="form-row mb-4">
                        <div className="col">
                        <Select
                         name="riceType"
                         value={this.state.riceType}
                         onChange={this.riceTypehandleChange}
                         options={riceTypeOptions}
                         placeholder="Rice Type"
                        />
                        </div>

                        <div className="col">
                        <Select
                         name="riceGradeType"
                         value={this.state.riceGradeType}
                         onChange={this.riceGradehandleChange}
                         options={riceGradeOptions}
                         placeholder="Rice Grade"
                        />
                        </div>
                    </div>

                    <div className="form-row mb-4">
                        <div className="col">
                        <Select
                         name="riceTextureType"
                         value={this.state.riceTextureType}
                         onChange={this.riceTexturehandleChange}
                         options={riceTextureOptions}
                         placeholder="Rice Texture"
                        />
                        </div>

                        <div className="col">
                        <Select
                         name="riceColorType"
                         value={this.state.riceColorType}
                         onChange={this.riceColorhandleChange}
                         options={riceColorOptions}
                         placeholder="Rice Color"
                        />
                        </div>
                    </div>

                    <div className="form-row mb-4">
                        <div className="col">
                        <Select
                         name="riceShapeType"
                         value={this.state.riceShapeType}
                         onChange={this.riceShapehandleChange}
                         options={riceShapeOptions}
                         placeholder="Rice Shape"
                        />
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
                        className="form-control mb-3" 
                        placeholder="Price" 
                        value={this.state.price}
                        onChange={this.onChange} />

                    <label htmlFor="defaultLoginFormEmail">Product picture</label>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" name="productImage" accept="image/jpeg, image/png, image/jpg" onChange={this.ImageonChange} />
                        <label className="custom-file-label">{this.state.imagename}</label>
                        </div>
                    </div>

                    <button className="btn btn-success my-4 btn-block " type="submit">Add Post</button>
                 </form> 
                </div>
            </div>
        )
    }
}

export default AddPost;