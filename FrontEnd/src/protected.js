import { Navigate } from "react-router-dom";
import RootLayOut from "./components/layout/RootLayOut";
import { useEffect, useRef, useState } from "react";

const Protected = () => {
  const data = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
          if (resData) {
            setIsAuthenticated(true);
            console.log(isAuthenticated);
          } else {
            console.log("user is inauthenticated.");
          }
        }
      } catch (error) {
        console.error("Error verifying data:", error);
      }
    };
    verifyToken();
  }, [data, isAuthenticated]);

  return <>{isAuthenticated ? <RootLayOut /> : <Navigate to="/login" />}</>; // even though the console.log(isAuthenticated) runs
  // and return null, the isAuthenticated variable is still null
  // thus it never runs my <RootLayOut/> component
};

export default Protected;
