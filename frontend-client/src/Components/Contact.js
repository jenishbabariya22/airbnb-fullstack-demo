import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic (e.g., API call)
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <Header onSearch={() => { }} /> {/* Pass a dummy function for now */}
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border p-2 rounded-md w-full"
              rows="4"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
            Send Message
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
