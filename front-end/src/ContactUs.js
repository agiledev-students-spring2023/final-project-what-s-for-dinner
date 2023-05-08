import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState('Send');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setFormStatus('Submitting...');
  
    const { name, email, message } = event.target.elements;
  
    const requestData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
  
    try {
      const baseUrl = process.env.REACT_APP_SERVER;
      await axios.post(`${baseUrl}/contact-us`, requestData);
      setFormStatus('Sent');
    } catch (error) {
      console.error(error);
      setFormStatus('Error sending');
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-3">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea className="form-control" id="message" required />
        </div>
        <button type="submit" className="btn btn-danger">
          {formStatus}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;