import "./App.css";
import { useState } from "react";
import Chat from "./Components/Chat";


function App() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "") {
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
          <Chat username={username}  />
      )}
    </div>
  );
}

export default App;
