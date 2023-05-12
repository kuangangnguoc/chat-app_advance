import './index.css';
import React from 'react';
import Chatbox from './components/Chatbox';
import {Link} from 'react-router-dom';
import firebase from './firebase';
import Lottie from 'lottie-react';
import cat from "./cat.json";



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
     <div className="bg-gray-200 fixed bottom-0 w-full py-10 shadow-lg">
     <form className='px-2 containerWrap flex mb-5' onSubmit={this.onSubmit} style={{position: 'fixed', bottom: 0, left: 0, right: 0}}>
      <input 
        className="input input w-full focus:outline-none bg-gray-100 rounded-r"
        type="text"
        name="message"
        id="message"
        value={this.state.message}
        placeholder="Enter a message..."
        onChange={this.onChange}
      />
      <button type="submit" className="w-auto bg-blue-500 hover:bg-blue-700 text-white rounded-r-lg px-5 text-sm" >Send</button>
</form>
</div>
     </div>
    }

    {!this.props.user &&
      <div className="disallow-chat">
       <div className="lottie-container mx-auto my-auto" style={{width: '500px', height: '500px'}}>
  <Lottie animationData={cat} />
</div>
     <h1 className="text-sky-500 text-5xl font-bold uppercase text-center transform translate-y-[-200px] " >
      Chit chat</h1>
  <p className="text-3xl  text-center transform translate-y-[-180px] ">
    to start chatting!
  </p>
  <div className="flex space-x-4 justify-center items-center transform translate-y-[-150px] ">
  <Link to="/Login" className="btn btn-info px-6">
    Login
  </Link>
  <Link to="/register" className="btn btn-outline btn-info">
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
