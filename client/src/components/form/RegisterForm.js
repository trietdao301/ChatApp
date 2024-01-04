import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";

function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://172.23.30.165:5000/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          repeatPassword: repeatPassword,
        }),
      });
      if (response.ok) {
        // Registration successful, redirect to login page or another route
        navigate("/login", {
          state: { flashMessage: "Successfully register a new user !!" },
        });
      } else {
        setErrorMessage("User or email are already existed ");
      }
    } catch (error) {
      console.log("Wrong url");
    }
  };
  return (
    <>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <form
        className="RegisterForm-container"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <header> Register </header>
        <label> Username</label>
        <input
          label="username"
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
        <label> Email</label>
        <input
          label="email"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <label> Password </label>
        <input
          label="password"
          placeholder="your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <input
          label="repeat password"
          placeholder="repeat password"
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          autoComplete="off"
        />

        <button type="submit"> Register </button>
        <NavLink to="/login"> Back to Sign in </NavLink>
      </form>
    </>
  );
}
export default RegisterForm;
