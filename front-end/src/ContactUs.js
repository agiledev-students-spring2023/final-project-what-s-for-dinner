import React, { useState } from 'react';

const ContactUs = () => {
  // Use the useState hook to manage the form submission status
  const [formStatus, setFormStatus] = useState('Send');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Update the form status to indicate that the form is being submitted
    setFormStatus('Submitting...');

    // Extract the values of the form fields
    const { name, email, message } = event.target.elements;

    // Create an object with the form data
    const formData = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    // Log the form data to the console
    console.log(formData);
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