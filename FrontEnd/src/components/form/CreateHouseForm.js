import React, { useState } from 'react';
import "./CreateHouseForm.css";
import { useNavigate } from 'react-router-dom';


const CreateHouseForm = () => {

  const navigate = useNavigate();
  const [formData, setFormdata] = useState(
    {address: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    description: '',});

  const handleChange = (e) =>{
      const name = e.target.name;
      const value = e.target.value;
      setFormdata(values => ({...values,[name]:value}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://172.23.30.165:5000/api/create_house', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      //window.location.href =('/');
      navigate('/market', {state: { flashMessage: "Successfully create a new sell !!" }});

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
   
        <label>
          Address:
        </label>
          <input type="text" name="address" value={formData.address} onChange={handleChange}/>
        <br />
        <label>
          Bedrooms:
        </label>
          <input type="text" name="bedrooms" value={formData.bedrooms} onChange={handleChange}/>
        <br />
        <label>
          Bathrooms:
          </label>
          <input type="text" name="bathrooms" value={formData.bathrooms} onChange={handleChange}/>
        <br />
        <label>
          Price:
          </label>
          <input type="text" name="price" value={formData.price} onChange={handleChange}/>
        <br />
        <label>
          Description:
          </label>
          <textarea name="description" value={formData.description} onChange={handleChange}/>
        <br />
        <button type="submit">Post</button>
  
    </form>
  );
};

export default CreateHouseForm;
