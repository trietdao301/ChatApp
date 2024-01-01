import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import Protected from "../../Protected";
import useFetch from "../../hooks/useFetch";
import io from "socket.io-client";

export default function Home() {
  const current_user = Object.values(Protected.getCurrentNameObject())[0]; // string
  const [friends, setFriends] = useState([]);
  const url = `http://172.23.30.165:5000/api/list_friend/${current_user}`;
  const resData = useFetch(url);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [dataReceived, setDataReceived] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setSocket(io("http://172.23.30.165:5000"));
    if (socket) {
      return () => socket.disconnect();
    }
  }, [current_user]);

  useEffect(() => {
    if (resData) {
      setFriends(Object.values(resData)[0]);
    }
  }, [resData]);

  function sendMessage() {
    if (message) {
      socket.emit("send_message", {
        message,
        room,
        sender: current_user,
        currentTime: currentTime.toLocaleTimeString(),
      });
    }
  }

  function handleClickToJoinRoom(friend, index) {
    const sortedUsernames = [current_user, friend].sort();
    const result = sortedUsernames.join("_");
    setActiveIndex(index);
    setRoom(result);
  }

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        console.log(data.message);

        setDataReceived((prevDataReceived) => {
          return [
            ...prevDataReceived,
            {
              message: data.message,
              sender: data.sender,
              senderTime: data.currentTime,
            },
          ];
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    const joinRoom = () => {
      if (room !== "") {
        socket.emit("join_room", { current_user, room });
        console.log(`Joining room with friend: ${room}`);
      }
    };
    joinRoom();
  }, [room, current_user]);

  return (
    <div className="Home-container">
      <div className="Home-left-column-container">
        {/* <div>User:</div> */}
        <div className="Home-left-column-all-friend-container">
          {friends.map((friend, index) => {
            return (
              <div
                key={index}
                className={`Home-left-column-each-friendbox-container ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleClickToJoinRoom(friend, index)} // ------------1
              >
                <div className="Home-left-column-each-friendbox-name">
                  {friend}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Home-middle-column-container">
        <div className="Home-middle-column-chat-container">
          {dataReceived &&
            dataReceived.map((eachMessage, index) => {
              return (
                <div key={index} className="Home-chatwindow-message">
                  <div className="Home-chatwindow-message-header">
                    <div className="Home-chatwindow-message-name">
                      {eachMessage.sender}
                    </div>
                    <div className="Home-chatwindow-message-time">
                      {eachMessage.senderTime}
                    </div>
                  </div>
                  <div className="Home-chatwindow-message-body">
                    {eachMessage.message}
                  </div>
                </div>
              );
            })}
        </div>

        <div>
          <input
            className="chat-input"
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)} //-------------2
          />
          <button className="Send-button" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
