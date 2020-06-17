import React, {Component} from 'react'
import {updateProfile, getProfile, addprofileImage} from './UserFunction'

class UpdateProfile extends Component{
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email:'',
            phoneNumber:'',
            id: '',
            profilePic: null,
            profilepicname: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.ImageonChange = this.ImageonChange.bind(this)
    }

    componentDidMount(){
        getProfile().then(res=>{
            this.setState({
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                phoneNumber: res.phoneNumber,
                id: res.id
            })
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    ImageonChange = (e) =>{
        this.setState({
            profilePic: e.target.files[0],
            profilepicname: e.target.files[0].name
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber:this.state.phoneNumber,
        }

        let form_data = new FormData();
        form_data.append('id', this.state.id)
        form_data.append('profilePic', this.state.profilePic);
        

        updateProfile(newUser, this.state.id).then(res => {
            this.props.history.push(`/profile`)
        })
        
        addprofileImage(form_data).then(res=>{
            console.log(this.state.id)
            console.log(this.state.profilePic)
        })
    }
    render(){
        console.log(this.state.profilepicname)
        return(
            <div className="row  pt-5 mt-5">
                <div className="col-lg-2" />
                <div className="col-lg-8">
                <div className="mt-3">
                    <h3>Update Profile</h3>
                    <hr />
                    <form className="text-left" noValidate onSubmit={this.onSubmit}>

                    <label>First Name</label>
                    <input type="text" name="firstName" className="form-control mb-4" placeholder={this.state.firstName} value={this.state.firstName} onChange={this.onChange} />

                    <label>Last Name</label>
                    <input type="text" name="lastName" className="form-control mb-4" placeholder={this.state.lastName} value={this.state.lastName} onChange={this.onChange} />
                    
                    <label htmlFor="defaultLoginFormEmail">Email</label>
                    <input type="email" name="email" className="form-control mb-4" placeholder={this.state.email} value={this.state.email} onChange={this.onChange} />
                    
                    <label htmlFor="defaultLoginFormEmail">Phone Number</label>
                    <input type="text" name="phoneNumber" className="form-control mb-4" placeholder={this.state.phoneNumber} value={this.state.phoneNumber} onChange={this.onChange} />
                    
                    <label htmlFor="defaultLoginFormEmail">Display picture</label>
                    <div className="input-group mb-3">
                        <div className="custom-file">
                        <input type="file" className="custom-file-input" name="profilePic" accept="image/jpeg, image/png, image/jpg" onChange={this.ImageonChange} />
                        <label className="custom-file-label">{this.state.profilepicname}</label>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-primary m-0">Update</button>
                    </div>
                    </form></div>
                </div>
            </div>
        )
    }
}

export default UpdateProfile;