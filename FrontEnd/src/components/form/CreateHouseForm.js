import React, { useState } from 'react';

const CreateHouseForm = () => {
  const [formData, setFormData] = useState({
    address: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic to handle the form submission (e.g., send data to a server).
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <br />
      <label>
        Bedrooms:
        <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
      </label>
      <br />
      <label>
        Bathrooms:
        <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" name="price" value={formData.price} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateHouseForm;
