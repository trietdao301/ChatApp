import React from "react";
import "./Market.css";
import useFetch from "../hooks/useFetch";
import {useState, useEffect} from 'react';
import {useLocation } from "react-router-dom";
import FlashMessage from './FlashMessage';

const Market = () => {     
  const [url] = useState('http://172.23.30.165:5000');
  const data = useFetch(url);      
  const [flashMessage, setFlashMessage] = useState(null);
  const rootOfFlashMessage = useLocation();                 // Display flash message
  const message = rootOfFlashMessage?.state?.flashMessage;

  useEffect(() => {                               // Display flash message
    if (message) {
      console.log("useEffect in Market");
      setFlashMessage(message);
      return () => {
        console.log("useEffect in Market clean up");
      }
    }
  }, [message]); 

  return (
    <div>
      {flashMessage && <FlashMessage message = {flashMessage}/>}
      {data && 
        <div className = "Market-container">
          {/* Using the map function to iterate through the products array */}
          {data.map((product) => (
            // Render each product
            <ul key={product.id}>
              <li>ID: {product.id}</li>
              <li>Name: {product.description}</li>
              <li>Address: {product.address}</li>
              <li>Price: {product.price}</li>
            </ul>
          ))}
      </div>}
    </div>
  );
};

export default Market;

