import "./ChatWindow.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

export default function ChatWindow() {
  useEffect(() => {
    const socket = io("http://172.23.30.165:5000/devices");

    // Handle connection to the socket
    socket.on("connect", () => {
      console.log("Connected to the server!");
    });

    // Handle 'responseMessage' event
    socket.on("responseMessage", (data) => {
      console.log("Received message from the server:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="ChatWindow-container">
      <div className="ChatWindow-inner-container">dsds</div>
      <div className="ChatWindow-inner-container">dsdsss</div>
    </div>
  );
}
