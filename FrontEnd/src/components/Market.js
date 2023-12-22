import React from "react";
import "./Market.css";
import useFetch from "../hooks/useFetch";
import {useState, useEffect} from 'react';
import { Outlet,useLocation } from "react-router-dom";
import FlashMessage from './FlashMessage';

const Market = () => {     
  const [url,setUrl] = useState('http://172.23.30.165:5000');
  const data = useFetch(url);      
  const [flashMessage, setFlashMessage] = useState(null);
  const location = useLocation();
  const message = location.state && location.state.flashMessage;

  useEffect(() => {
    if (message) {
      setFlashMessage(message);
    }
  }, [message]); 

  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {flashMessage && <FlashMessage message = {flashMessage}/>}
      <div className = "DisplayAllProducts-container">
      
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
      </div>
    </div>
  );
};

export default Market;

