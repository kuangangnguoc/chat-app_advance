import React from "react";
import firebase from'../firebase.js';
import {Link} from 'react-router-dom';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            error:null
        };
    }
    handleChange = e =>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit=e =>{
        e.preventDefault();
        const {email, password}=this.state;
        firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
                this.props.history.push('/');
            })
            .catch(error=>{
                this.setState({error});
            });
    }
    render(){
        const {email, password, error}=this.state;
        return(
            <div className="auth-container is-flex is-justify-content-center is-align-items-center mt-6">
  
            {error && <p className="error-message">{error.message}</p>}
            <form onSubmit={this.handleSubmit} className="form is-size-5" style={{ width: '700px' }}>
              <div class="box-body">
            
                <div class="columns is-flex is-flex-direction-column box">
                <h1 class="title  has-text-weight-semibold has-text-info is-size-3" >Login</h1>
                  <p>Login to access your account</p>
                  <div class="column">
                    <label htmlFor="email" className="label">Email address</label>
                    <input class="input is-info" type="text" name="email" id="email" value={email} onChange={this.handleChange}></input>
                  </div>
                  <div class="column">
                    <label htmlFor="password" className="label">Password</label>
                    <input class="input is-info" type="password"
                              name="password"
                              id="password"
                              value={password}
                              onChange={this.handleChange}>
              </input>
                  </div>
                  <div class="column">
                    <button class="button is-link is-fullwidth " type="submit">Login</button>
                  </div>
                  <div class="has-text-centered">
                    <p> Don't have an account? <Link className="button is-text has-text-info" to="/register">Register here</Link> 
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
    }
}
export default Login;