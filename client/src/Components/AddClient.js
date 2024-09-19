import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AddClient({ visible, onClose, onClientAdded }) {
  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    tp: ''
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/createclient', data);
      
      console.log('Client added:', response.data);
      setData({ fname: '', lname: '', email: '', tp: '' });
      
      if (typeof onClientAdded === 'function') {
        onClientAdded(response.data.data);
      }

      toast.success('Client added successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        toast.error(error.response.data.error || 'Error adding client');
      } else if (error.request) {
        toast.error('No response received from server. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add Client</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            type="text"
            name="fname"
            value={data.fname}
            onChange={handleChange}
            placeholder="Client First Name"
            required
          />
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            type="text"
            name="lname"
            value={data.lname}
            onChange={handleChange}
            placeholder="Client Last Name"
            required
          />
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Client Email"
            required
          />
          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            type="tel"
            name="tp"
            value={data.tp}
            onChange={handleChange}
            placeholder="Client Phone"
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              type="submit"
            >
              Save Client
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}