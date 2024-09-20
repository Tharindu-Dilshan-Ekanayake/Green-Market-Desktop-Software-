import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-hot-toast';

export default function ModifyClient({ visible, onClose, onClientModifieded }) {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Get clients from the server
  const getclients = async () => {
    try {
      const response = await axios.get('/getclient');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  // Function to delete a client
  const deleteClient = async (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`/deleteclient/${clientId}`);
        setClients(clients.filter(client => client._id !== clientId)); // Remove client from state
        toast.success('Client deleted successfully!'); // Show success toast
      } catch (error) {
        toast.error('Failed to delete client. Please try again.'); // Show error toast
        console.error('Error deleting client:', error);
      }
    }
  };

  useEffect(() => {
    if (visible) {
      getclients();
    }
  }, [visible]);

  if (!visible) return null;

  // Filter clients based on search term
  const filteredClients = clients.filter(client =>
    client.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.tp.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[1000px] h-[800px]">
        {/* Search Bar */}
        <div>
          <input
            className="px-4 py-2 w-[400px] border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Search Email, Phone, or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Clients Table */}
        <div className="h-[600px] overflow-auto mt-8 border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-center text gray-500">First Name</th>
                <th className="px-6 py-3 text-sm font-medium text-center text- gray-500">Last Name</th>
                <th className="px-6 py-3 text-sm font-medium text-center text- gray-500">Phone</th>
                <th className="px-6 py-3 text-sm font-medium text-center gray-500 text-">Email</th>
                <th className="px-6 py-3 text-sm font-medium text-center gray-500 text-">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client._id}>
                    <td className="px-6 py-4 text-sm text-gray-500">{client.fname}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{client.lname}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{client.tp}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{client.email}</td>
                    <td>
                      <div className='flex justify-center'>
                        <div>
                          <button><FaEdit className='size-6 hover:text-blue-950'></FaEdit></button>
                        </div>
                        <div className='pl-5'>
                          <button onClick={() => deleteClient(client._id)}>
                            <MdDelete className='text-red-500 size-6 hover:text-red-700'/>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-sm text-center text-gray-500">
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="mt-8">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
