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
            <div className="">
  
            {error && <p className="error-message">{error.message}</p>}
            <form onSubmit={this.handleSubmit} className="form mt-20 mx-auto" style={{ width: '700px' }}>
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h1 className="text-center uppercase text-sky-500 text-3xl font-bold mb-4" >Login</h1>
    <p className="text-center mb-6">Login to access your account</p>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3 mb-6 md:mb-0">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email address</label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="email" id="email" value={email} onChange={this.handleChange}></input>
      </div>
      <div className="w-full px-3">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" name="password" id="password" value={password} onChange={this.handleChange}></input>
      </div>
    </div>
    <div className="flex items-center justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
    </div>
    <div className="text-center mt-4">
      <p className="text-gray-600">Don't have an account? <Link className="text-blue-500 hover:text-blue-700 font-bold" to="/register">Register here</Link></p>
    </div>
  </div>
</form>

          </div>
        );
    }
}
export default Login;