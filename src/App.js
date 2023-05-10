import './App.css';
import React from 'react';
import Chatbox from './components/Chatbox';
import {Link} from 'react-router-dom';
import firebase from './firebase';
import Lottie from 'lottie-react';
import cat from "./cat.json";
import 'bulma/css/bulma.min.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      message:''
    };
  }

  onChange =(event) => {
    this.setState({[event.target.name]:event.target.value});
  };

  onSubmit =(event) => {
    event.preventDefault();
    if(this.state.message !==''){
      const chatRef =firebase.database().ref('general');
      const chat ={
        message: this.state.message,
        user: this.props.user.displayName,
        timestamp:new Date().getTime()
      }

      chatRef.push(chat);
      this.setState({message:''});
    }
  };

render() {
  return (
    
    <div className="App">
     

     {this.props.user &&
     <div className="allow-chat">
     <Chatbox/>
     <form className='message-form' onSubmit={this.onSubmit}>
      <input 
      type="text"
      name="message"
      id="message"
      value={this.state.message}
      placeholder="Enter a message..."
       onChange={this.onChange}/>
      <button>Send</button>
     </form>
     </div>
    }
    {!this.props.user &&
      <div className="disallow-chat">
       <div className="lottie-container" style={{width: '500px', height: '500px'}}>
  <Lottie animationData={cat}/>
</div>
     <h1 class="title is-family-sans-serif is-uppercase has-text-weight-semibold has-text-info is-size-1" >
      Chit chat</h1>
  <p className="start-Chat has-text-centered pb-4 is-capitalized">
    to start chatting!
  </p>
  <div className="buttons is-centered">
    <Link to="/Login" className="button is-link is-light p-4 m-4">
      Login
    </Link>
    <Link to="/register" className="button is-link p-4 m-4">
      Register
    </Link>

</div>
      </div>
    }
    </div>
  );
}
}
export default App;
