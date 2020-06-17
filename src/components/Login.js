import React, {Component} from 'react'
import {login} from './UserFunction'
import {Redirect} from 'react-router-dom'

class Login extends Component{
    constructor(){
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if(res === true){
                this.props.history.push(`/profile`)
                window.location.reload('false');
            } 
        })
    }
    render(){
        return(
            <div style={{paddingTop:100}}>
                <form noValidate onSubmit={this.onSubmit} className="text-center p-5">
                    <p className="h4 mb-4">Sign in</p>
                    
                    <input type="email" 
                        name="email" 
                        className="form-control mb-4" 
                        placeholder="E-mail" 
                        value={this.state.email}
                        onChange={this.onChange} />
                    
                    <input type="password" 
                        name="password" 
                        className="form-control mb-4" 
                        placeholder="Password" 
                        value={this.state.password}
                        onChange={this.onChange}/>
                    <div className="d-flex justify-content-around">
                        <div>
                        
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultLoginFormRemember" />
                            <label className="custom-control-label" htmlFor="defaultLoginFormRemember">Remember me</label>
                        </div>
                        </div>
                        <div>
                        
                        <a href>Forgot password?</a>
                        </div>
                    </div>
                    
                    <button className="btn btn-info btn-block my-4" type="submit">Sign in</button>
                    
                    <p>Not a member?
                        <a href="register"><strong> Register</strong></a>
                    </p>
                    
                    <p>or sign in with:</p>
                    <a href="#" className="mx-2" role="button"><i className="fab fa-facebook-f light-blue-text" /></a>
                    <a href="#" className="mx-2" role="button"><i className="fab fa-twitter light-blue-text" /></a>
                    <a href="#" className="mx-2" role="button"><i className="fab fa-linkedin-in light-blue-text" /></a>
                    <a href="#" className="mx-2" role="button"><i className="fab fa-github light-blue-text" /></a>
                </form>
            </div>
      
        )
    }
}

export default Login;