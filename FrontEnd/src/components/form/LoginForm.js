import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./LoginForm.css";
import FlashMessage from "../FlashMessage";
import { useLocation, useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);
  const rootOfFlashMessage = useLocation(); // Display flash message
  const message = rootOfFlashMessage?.state?.flashMessage;
  const [jwtToken, setJwtToken] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://172.23.30.165:5000/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.accessToken);
        console.log(data.accessToken);
        //console.log(typeof data.accessToken);
        navigate("/home");
      } else {
        console.log("POST response is not ok");
      }
    } catch (error) {
      console.log("POST body is bad");
    }
  }

  useEffect(() => {
    // Display flash message
    if (message) {
      console.log("useEffect in Login");
      console.log(message);
      setFlashMessage(message);
      return () => {
        console.log("useEffect in Login clean up");
      };
    }
  }, [message]);

  return (
    <>
      {flashMessage && <FlashMessage message={flashMessage} />}
      <form className="LoginForm-container" onSubmit={handleSubmit}>
        <div> Login </div>
        <label> Username</label>
        <input
          label="username"
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label> Password </label>
        <input
          label="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit"> Login </button>
        <NavLink to="/register"> Register here </NavLink>
      </form>
    </>
  );
}
export default LoginForm;
