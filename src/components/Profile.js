import React, {Component} from 'react'
import {getProfile, getProfilePic, logout} from './UserFunction'
import DefaultProfilePic from '../css/img/defaultprofilepic.png'
import '../css/Landingstyle.css';
class Profile extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            billingID: '',
            profilePic: null,
        }
    }
    

    componentDidMount(){
        getProfile().then(res=>{
            // console.log(res.firstName)
            this.setState({
                name: res.firstName,
                email: res.email,
                billingID: res.billingNumber
            })
            getProfilePic(res.id).then(result=>{
                console.log(res.id)
                this.setState({
                    profilePic: result.imageURL
                })
            })
            .catch(err=>{
                if(err.response){
                    console.log("test")
                }
                else if(err.request){
                    this.setState({
                        profilePic: DefaultProfilePic
                    })
                    console.log(this.state.profilePic)
                }
                else{
                    this.setState({
                        profilePic: DefaultProfilePic
                    })
                    console.log(this.state.profilePic)
                }
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div className="container">
                <div style={{paddingTop:100}}>
                <div className="jumbotron mt-5">
                    <div className="col-sm-4 mt-5" style={{paddingLeft:150}}>
                        <div className="profile-pic">
                            <img src={this.state.profilePic} alt="profile pic" />
                        </div>
                        <h1 className="text-center">Profile</h1>
                    </div>
                    <table className="table col-md-5 mx-auto">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Billing Details</td>
                                <td>{this.state.billingID}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="col-md-6">
                    <p><a href="updateprofile">Update Profile</a><strong></strong></p>
                    <p><a href="logout">Logout</a><strong></strong></p>
                    </div>
                    
                </div>
                </div>
            </div>
        )
    }
}

export default Profile;