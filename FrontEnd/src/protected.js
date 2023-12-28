import { Navigate, useNavigate } from "react-router-dom";
import RootLayOut from "./components/layout/RootLayOut";
import { useEffect, useRef, useState } from "react";
import Login from "./page/Login/Login.js";

const Protected = () => {
  let navigate = useNavigate();
  const data = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nameObject, setNameObject] = useState(null);
  //const isAuthenticated = useRef(false);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://172.23.30.165:5000/verify_token", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(data), // data = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
        });
        if (response.ok) {
          const resData = await response.json();
          console.log("In protected" + JSON.stringify(resData));
          //isAuthenticated.current = false;
          setNameObject(resData); // nameObject = {name:"john"}
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying data:", error);
      }
    };
    verifyToken();
  }, []);
  console.log("protected route runs");

  return <>{isAuthenticated && <RootLayOut name={nameObject} />}</>; //<Navigate to="/login" />
};

export default Protected;
