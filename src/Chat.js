import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Chatowner from "./assets/chatowner.svg"
import OtherPeople from "./assets/other.svg"
function Chat({ username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      setMessageList((list) => [...list, messageData]);
         localStorage.setItem("messages",JSON.stringify(messageList));
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    let data=null;
    if(localStorage.getItem("messages")){
       data=JSON.parse(localStorage.getItem("messages"));
      setMessageList(data)
      console.log(data,"data")
    }
  //  setMessageList(localStorage.getItem("messages", JSON.parse(messageList)));
  }, [setMessageList,setCurrentMessage]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat {username}</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                {/*user avatar image*/}
                <img
                  src={
                    username === messageContent.author ? Chatowner : OtherPeople
                  }
                  alt="image"
                />
                {/* message content */}
                <div className="message-content-container">
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  {/* message timestamp */}
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        {/* trigger message for sending message */}
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
