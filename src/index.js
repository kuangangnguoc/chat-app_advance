import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from'./components/Login';
import Register from'./components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase, {auth} from './firebase.js';
import Lottie from 'lottie-react';
import cat from "./cat.json";

class AppRouter extends React.Component{ 
  constructor(props){
    super(props);
    this.state={user:null}
  }
  componentDidMount(){
    auth.onAuthStateChanged(user =>{
      if(user){
        this.setState({user});
      }
    })
  }
  logOutUser =() =>{
    firebase.auth().signOut()
    .then(window.location ="/");
  }
  render(){
    return(
      <Router>
        <div className='app'>
        
  {this.state.user &&
  <nav className='main-nav bg-gray-800 text-white py-4 px-6'>
  <div className="flex items-center justify-between">
    <div className="w-20 h-20 mr-2"><Lottie animationData={cat}/></div>
    <h1 className="text-lg font-bold">ChitChat</h1>
    <a href="#!" onClick={this.logOutUser} className="text-gray-400 hover:text-white">Log out</a>
  </div>
</nav>

  }




          <Switch>
            <Route  path="/" exact render={()=><App user={this.state.user}/>}/>
            <Route  path="/login" exact component={Login}/>
            <Route  path="/register" exact component={Register}/>
          </Switch>
        </div>
      </Router>
    );
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppRouter/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
