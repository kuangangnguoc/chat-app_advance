import React from 'react';
import firebase from'../firebase.js';
import {Link} from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import Add from "../img/addAvatar.png";

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            error:null
        }
    }
    handleChange = e =>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit=e =>{
        e.preventDefault();
        const {email, username, password}=this.state;
        firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
            const user= firebase.auth().currentUser;
            user.updateProfile({displayName: username}).then(()=>{
                this.props.history.push('/');
            })
            .catch(error=>{
                this.setState({error});
            });
        })
        .catch(error=>{
            this.setState({error});
        })
    }
    render(){
        const {email, username, password, error}=this.state;
        return(
           
            <div className="auth-container is-flex is-justify-content-center is-align-items-center">
  
  {error && <p className="error-message">{error.message}</p>}
  <form onSubmit={this.handleSubmit} className="form is-size-5" style={{ width: '700px' }}>
    <div class="box-body">
  
      <div class="columns is-flex is-flex-direction-column box">
      <h1 class="title  has-text-weight-semibold has-text-info is-size-3" >Register your account</h1>
        <div class="column">
          <label htmlFor="username" className="label">Username</label>
          <input class="input is-info" type="text" name="username" id="username" value={username} onChange={this.handleChange} ></input>
        </div>
        <div class="column">
          <label htmlFor="email" className="label">Email address</label>
          <input class="input is-info" type="text" name="email" id="email" value={email} onChange={this.handleChange} ></input>
        </div>
        <div class="column">
          <label htmlFor="password" className="label">Choose a password</label>
          <input class="input is-info" type="password" name="password" id="password" value={password} onChange={this.handleChange} ></input>
        </div>
        <input style={{display:"none"}}type="file" id="file"/>
        <lable htmlFor="file">
        <img src={Add} alt=""/>
        <span className="is-align-items-center">Add an avatar</span>
        </lable>
        <div class="column">
          <button class="button is-link is-fullwidth " type="submit">Create an account</button>
        </div>
        <div class="has-text-centered">
          <p> Already have an account? <Link className="button is-text has-text-info" to="/login">Login here</Link> 
          </p>
        </div>
      </div>
    </div>
  </form>
</div>

        );
    }
}
export default Register;