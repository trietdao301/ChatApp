import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import ChatWindow from "../../components/ChatWindow.js";
// https://randomuser.me/api

export default function Home() {
  const [message, setMessage] = useState("");

  function sendMessage() {}
  return (
    <div className="home-container">
      <div className="left-column-container">hi</div>

      <div className="chat-container">
        <div>
          <ChatWindow />
        </div>
        <div>
          <input
            className="chat-input"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
