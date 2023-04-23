import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState('Send');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormStatus('Submitting...');

    const { name, email, message } = event.target.elements;

    const formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    try {
      const response = await axios.post('/contact/submit', formData);
      setFormStatus('Sent!');
      console.log(response.data.message);
    } catch (error) {
      setFormStatus('Error sending');
      console.error('Error submitting contact form:', error);
    }
  };


  return (
    <div className="container mt-5">
      <h2 className="mb-3">Contact Form</h2>
      {/* Bind the handleSubmit function to the form's onSubmit event */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* Label for the name input field */}
          <label htmlFor="name" className="form-label">
            Name
          </label>
          {/* Name input field */}
          <input type="text" className="form-control" id="name" required />
        </div>
        <div className="mb-3">
          {/* Label for the email input field */}
          <label htmlFor="email" className="form-label">
            Email
          </label>
          {/* Email input field */}
          <input type="email" className="form-control" id="email" required />
        </div>
        <div className="mb-3">
          {/* Label for the message input field */}
          <label htmlFor="message" className="form-label">
            Message
          </label>
          {/* Message input field */}
          <textarea className="form-control" id="message" required />
        </div>
        {/* Submit button */}
        <button type="submit" className="btn btn-danger">
          {/* Show the formStatus in the button text */}
          {formStatus}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;