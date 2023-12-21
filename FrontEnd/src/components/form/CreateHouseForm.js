import React, { useState } from 'react';
import "./CreateHouseForm.css";
const CreateHouseForm = () => {

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
const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData)
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
