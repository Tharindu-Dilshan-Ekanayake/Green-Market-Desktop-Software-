import React, { useState, useEffect } from 'react';
import AddClient from './AddClient';
import ModifyClient from './ModifyClient';
import axios from 'axios'; // Make sure to import axios if you're fetching data

export default function Clients() {
    const [showModal1, setShowModal1] = useState(false);
    const handleAddClient = () => {
        setShowModal1(true);
    };

    const [showModal2, setShowModal2] = useState(false);
    const handleModifyClient = () => {
        setShowModal2(true);
    };

    const handleModalClose = () => {
        setShowModal1(false);
        setShowModal2(false);
    };

    const [searchTerm, setSearchTerm] = useState('');
    const [clients, setClients] = useState([]); // Store all clients
    const [filteredClients, setFilteredClients] = useState([]); // Store filtered clients

    useEffect(() => {
        // Fetch all clients when the component mounts
        const fetchClients = async () => {
            try {
                const response = await axios.get('/getclient'); // Adjust the endpoint as necessary
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        fetchClients();
    }, []);

    useEffect(() => {
        // Filter clients based on the search term
        const results = clients.filter(client =>
            client.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.tp.includes(searchTerm)
        );
        setFilteredClients(results);
    }, [searchTerm, clients]);

    return (
        <div className="p-6">
            <div className="flex items-center justify-center space-x-4">
                <div>
                    <input 
                        className="px-4 py-2 w-[400px] border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
                        type="text" 
                        placeholder="Search Email, Phone, or Name..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                       {/* Search Results Dropdown */}
                      {searchTerm && filteredClients.length > 0 && (
                          <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg">
                              {filteredClients.map(client => (
                                  <div key={client._id} className="p-2 cursor-pointer hover:bg-gray-100">
                                      {client.fname} {client.lname} - {client.email} - {client.tp}
                                  </div>
                              ))}
                          </div>
                      )}
                </div>
                
                <div>
                    <button 
                        className="px-4 py-2 font-semibold text-white transition duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:scale-105"
                        onClick={handleAddClient}
                    >
                        Add Client
                    </button>
                </div>
                <div>
                    <button 
                        className="px-4 py-2 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105"
                        onClick={handleModifyClient}
                    >
                        Clients
                    </button>
                </div>
            </div>

         

            <div>
                <AddClient
                    visible={showModal1}
                    onClose={handleModalClose}
                />
            </div>
            <div>
                <ModifyClient
                    visible={showModal2}
                    onClose={handleModalClose}
                />
            </div>
        </div>
    );
}
