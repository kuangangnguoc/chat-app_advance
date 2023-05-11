import React from "react";
import firebase from "../firebase.js";
import { UserAuth } from "../context/AuthContext";

function ChatboxContent({ chats }) {
  const currentUser = UserAuth().currentUser;

  return (
    <div className="chatbox pb-44 pt-20 containerWrap">
      <ul className="chat-list">
        {chats.sort((a, b) => a.date - b.date).map(chat => {
          const postDate = new Date(chat.date);

          return (
            <div
  className={`chat ${
    chat.user.uid === currentUser.uid ? "chat-end" : "chat-start"
  }`}
  key={chat.id}
>

              <div className="chat-header">
                {chat.user}
                <time className="text-xs opacity-50">
                  {postDate.getDate()}/{postDate.getMonth() + 1}
                </time>
              </div>
              <div className="chat-bubble">{chat.message}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

class Chatbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };
  }

  componentDidMount() {
    const chatRef = firebase.database().ref("general");
    chatRef.on("value", snapshot => {
      const getChats = snapshot.val();
      let ascChats = [];
      for (let chat in getChats) {
        if (getChats[chat].message !== "") {
          ascChats.push({
            id: chat,
            message: getChats[chat].message,
            user: getChats[chat].user,
            date: getChats[chat].timestamp
          });
        }
      }
      const chats = ascChats.reverse();
      this.setState({ chats });
    });
  }

  render() {
    return <ChatboxContent chats={this.state.chats} />;
  }
}

export default Chatbox;