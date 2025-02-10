import React, { useState } from 'react';

const AddBeds = () => {
  const [formData, setFormData] = useState({
    type_name: '',
    total_beds: '',
    hospital_id: '',
    is_occupied: false
  });

  const [responseMessage, setResponseMessage] = useState('');
  const jwtToken = localStorage.getItem("jwtToken");
  const region = localStorage.getItem("region");
  // const role = localStorage.getItem("role");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:2426/hospitalAdmin/registerBeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": jwtToken,
          "Region": region,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      setResponseMessage(data.message || 'Bed record added successfully!');
    } catch (error) {
      setResponseMessage(error.message || 'Error adding bed record.');
    }
  };

  return (
    <div className="add-beds" style={{ width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#333' }}>Add Beds</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>Bed Type Name:</label>
          <input
            type="text"
            name="type_name"
            value={formData.type_name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', color: '#333' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>Total Beds:</label>
          <input
            type="number"
            name="total_beds"
            value={formData.total_beds}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', color: '#333' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>Is Occupied:</label>
          <input
            type="checkbox"
            name="is_occupied"
            checked={formData.is_occupied}
            onChange={handleChange}
            style={{ width: 'auto', marginTop: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Add Bed
        </button>
      </form>
      {responseMessage && <p style={{ textAlign: 'center', color: 'green', marginTop: '20px', fontSize: '16px' }}>{responseMessage}</p>}
    </div>

  );
};

export default AddBeds;
