import React from "react";
import "./DisplayAllProducts.css";


const DisplayAllProducts = (props) => {     // props must start with products. Example: props = {"products": [{},{}] }
  const { products } = props;         

  return (
    <div className = "DisplayAllProducts-container">
      {/* Using the map function to iterate through the products array */}
      {products.map((product) => (
        // Render each product
        <ul key={product.id}>
          <li>ID: {product.id}</li>
          <li>Name: {product.description}</li>
          <li>Address: {product.address}</li>
          <li>Price: {product.price}</li>
        </ul>
      ))}
    </div>
  );
};

export default DisplayAllProducts;