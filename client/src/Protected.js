import { useNavigate } from "react-router-dom";
import RootLayOut from "./components/layout/RootLayOut";
import { useEffect, useState } from "react";

let storedNameObject = null;
const Protected = () => {
  let navigate = useNavigate();
  const data = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nameObject, setNameObject] = useState(null);

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
          if (resData) {
            //isAuthenticated.current = false;
            setNameObject(resData); // nameObject = {name:"john"}
            storedNameObject = resData;
            setIsAuthenticated(true);
          }
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

  return <>{isAuthenticated && <RootLayOut name={nameObject} />}</>; //<Navigate to="/login" />
};
const getCurrentNameObject = () => storedNameObject;

export default { Protected, getCurrentNameObject };
