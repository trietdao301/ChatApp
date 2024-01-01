// import "./FriendBox.css";
// import Protected from "../Protected";
// import io from "socket.io-client";

// function FriendBox({ name }) {
//   let roomID = 2;
//   const current_user = Object.values(Protected.getCurrentNameObject());
//   function handleClick() {
//     const socket = io("http://172.23.30.165:5000"); // Replace with your Socket.IO server address
//     // Function to join a room
//     const joinRoom = (username, room) => {
//       socket.emit("join", { username, room });
//     };
//     // Example usage
//     const username = "John";
//     const room = "exampleRoom";
//     joinRoom(username, room);
//   }

//   return (
//     <div className="FriendBox-container" onClick={handleClick}>
//       <div className="FriendBox-name">{name}</div>
//     </div>
//   );
// }
// export default FriendBox;
