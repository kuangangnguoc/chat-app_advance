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
  <nav className='main-nav has-background-info-light pt-4'>
    <div className="is-flex is-justify-content-space-between px-3">
      <div style={{width: '100px', height: '100px'}}><Lottie animationData={cat}/></div>
      <h2 className="has-text-info is-size-6">ChitChat</h2>
      <a href="#!" onClick={this.logOutUser} className="is-size-6">Log out</a>
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
