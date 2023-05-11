import React from 'react';
import firebase from'../firebase.js';
import {Link} from 'react-router-dom';


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
           
            <div className="auth-container ">
  
  {error && <p className="error-message">{error.message}</p>}
  <form onSubmit={this.handleSubmit} className="form mx-auto mt-10 w-2/3 max-w-lg">
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="grid grid-cols-1 gap-6">
      <h1 class="text-center uppercase text-sky-500 text-3xl font-bold mb-4">Register your account</h1>
      <p class="text-center mb-6">Register to start chatting</p>
      <div class="w-full">
        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
        <input class="input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="username" id="username" value={username} onChange={this.handleChange} ></input>
      </div>
      <div class="">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email address</label>
        <input class="input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="email" id="email" value={email} onChange={this.handleChange} ></input>
      </div>
      <div class="">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Choose a password</label>
        <input class="input appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" name="password" id="password" value={password} onChange={this.handleChange} ></input>
      </div>
      <div class="">
        <button class="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Create an account</button>
      </div>
      <div class="text-center">
        <p> Already have an account? <Link className="button text-blue-500 hover:text-blue-700 font-bold " to="/login">Login here</Link> 
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