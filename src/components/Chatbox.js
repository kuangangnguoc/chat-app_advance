import React from "react";
import './Chatbox.css';
import firebase from'../firebase.js';

class Chatbox extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            chats:[]
        }}
    componentDidMount(){
        const chatRef = firebase.database().ref('general');
        chatRef.on('value',snapshot=>{
            const getChats =snapshot.val();
            let ascChats =[];
            for(let chat in getChats){
                if(getChats[chat].message !==''){
                    ascChats.push({
                        id:chat,
                        message:getChats[chat].message,
                        user:getChats[chat].user,
                        date:getChats[chat].timestamp
                    });}}
        const chats=ascChats.reverse();
        this.setState({chats});
        });}
    render(){
        return(
            <div className="chatbox pb-4 pt-4">
  <ul className="chat-list">
    {this.state.chats.map(chat=>{
      const postDate = new Date(chat.date);
      return(
        <li key={chat.id}>
          <em className="has-text-grey-light mr-2">{postDate.getDate()+'/'+(postDate.getMonth()+1)}</em>
          <strong className="has-text-link">{chat.user}:</strong>
          {chat.message}
        </li>
      )
    })}
  </ul>
</div>

        );}}
export default Chatbox;