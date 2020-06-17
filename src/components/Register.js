import React, {Component} from 'react'
import Select from 'react-select'
import {register} from './UserFunction'
import DefaultProfilePic from '../css/img/defaultprofilepic.png'

const options = [
    {value: 'Shop', label: 'Shop'},
    {value: 'Customer', label: 'Customer'},
]

class Register extends Component {
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email:'',
            phoneNumber:'',
            userType: null,
            password:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleChange = userType => {
        this.setState({userType});
        console.log(userType.value);
    }

    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber:this.state.phoneNumber,
            userType:this.state.userType.value,
            password: this.state.password
        }

        register(newUser).then(res => {
            this.props.history.push(`/login`)
        }) 
    }
    render(){
        return(
            <div style={{paddingTop:100}}>
                 <div className="container">
                 <form noValidate onSubmit={this.onSubmit} className="text-center p-5">
                 <p className="h4 mb-5">Sign up</p>
                    <div className="form-row mb-4">
                        <div className="col">
                            <input type="text"
                                name="firstName" 
                                className="form-control" 
                                placeholder="First name" 
                                value={this.state.firstName} 
                                onChange={this.onChange} />
                        </div>

                        <div className="col">
                        <input type="text" 
                            name="lastName" 
                            className="form-control" 
                            placeholder="Last name"
                            value={this.state.lastName}
                            onChange={this.onChange} />
                        </div>

                    </div>

                    <div className="form-row mb-4">
                        <div className="col">
                        <input type="text" 
                            name="phoneNumber"
                            className="form-control mb-4" 
                            placeholder="Phone number" 
                            aria-describedby="defaultRegisterFormPhoneHelpBlock"
                            value={this.state.phoneNumber}
                            onChange={this.onChange} />
                        </div>

                        <div className="col">
                        <Select
                         name="userType"
                         value={this.state.userType}
                         onChange={this.handleChange}
                         options={options}
                         placeholder="Customer/Shop"
                        />
                        </div>
                    </div>
                    

                    <input type="email" 
                        name="email" 
                        className="form-control mb-4" 
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.onChange}
                         />

                    <input type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="Password" 
                        aria-describedby="defaultRegisterFormPasswordHelpBlock"
                        value={this.state.password}
                        onChange={this.onChange} />

                    <small id="defaultRegisterFormPasswordHelpBlock" className="form-text text-muted mb-4">
                        At least 8 characters and 1 digit
                    </small>

                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="defaultRegisterFormNewsletter" />
                        <label className="custom-control-label" htmlFor="defaultRegisterFormNewsletter">Subscribe to our newsletter</label>
                    </div>

                    <button className="btn btn-info my-4 btn-block" type="submit">Sign Up</button>
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

export default Register;