import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-hot-toast';

export default function ViewStore({ visible, onClose }) {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentStore, setCurrentStore] = useState({});
  const [newStore, setNewStore] = useState({
    item: '',
    ppu: '',
    qnt: ''
  });

  // Fetch store items from the server
  const getStores = async () => {
    try {
      const response = await axios.get('/store/storeget');
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching store data:', error);
    }
  };

  // Add new store item
  const addStore = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/store/storecreate', newStore);
      setStores([...stores, response.data.data]);
      setNewStore({ item: '', ppu: '', qnt: '' }); // Reset input fields
      toast.success('Store item added successfully!');
    } catch (error) {
      toast.error('Failed to add store item. Please try again.');
      console.error('Error adding store item:', error);
    }
  };

  // Function to delete a store item
  const deleteStore = async (storeId) => {
    if (window.confirm('Are you sure you want to delete this store item?')) {
      try {
        await axios.delete(`/store/deletestore/${storeId}`);
        setStores(stores.filter(store => store._id !== storeId)); // Remove store from state
        toast.success('Store item deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete store item. Please try again.');
        console.error('Error deleting store item:', error);
      }
    }
  };

  // Function to handle edit button click
  const handleEditClick = (store) => {
    setCurrentStore(store);
    setEditMode(true);
  };

  // Function to update store item
  const updateStore = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/store/updateStore/${currentStore._id}`, currentStore);
      setStores(stores.map(store => (store._id === currentStore._id ? currentStore : store)));
      toast.success('Store item updated successfully!');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update store item. Please try again.');
      console.error('Error updating store item:', error);
    }
  };

  useEffect(() => {
    if (visible) {
      getStores();
    }
  }, [visible]);

  if (!visible) return null;

  // Filter stores based on search term
  const filteredStores = stores.filter(store =>
    store.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[1000px] h-[800px]">
        {/* Add/Edit Form */}
        

        {/* Search Bar */}
        <div className="mt-4">
          <input
            className="px-4 py-2 w-[400px] border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Search Store..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Store Items Table */}
        <div className="h-[520px] overflow-auto mt-8 border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-center text-gray-500">Item No</th>
                <th className="px-6 py-3 text-sm font-medium text-center text-gray-500">Item</th>
                <th className="px-6 py-3 text-sm font-medium text-center text-gray-500">PPU</th>
                <th className="px-6 py-3 text-sm font-medium text-center text-gray-500">Quantity</th>
                <th className="px-6 py-3 text-sm font-medium text-center text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStores.length > 0 ? (
                filteredStores.map((store) => (
                  <tr key={store._id}>
                    <td className="px-6 py-4 text-sm text-gray-500">{store.itemno}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{store.item}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{store.ppu}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{store.qnt}</td>
                    <td>
                      <div className="flex justify-center">
                        <button onClick={() => handleEditClick(store)}>
                          <FaEdit className="text-blue-500 hover:text-blue-700" />
                        </button>
                        <button onClick={() => deleteStore(store._id)} className="ml-5">
                          <MdDelete className="text-red-500 hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-sm text-center text-gray-500">
                    No store items found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className='pt-4'>
        <form onSubmit={editMode ? updateStore : addStore}>
          <div>
            <input
              className="px-4 py-2 w-[200px] border-2 border-gray-300 rounded-lg"
              type="text"
              placeholder="Item Name"
              value={editMode ? currentStore.item : newStore.item}
              onChange={(e) => editMode ? setCurrentStore({ ...currentStore, item: e.target.value }) : setNewStore({ ...newStore, item: e.target.value })}
              required
            />
            <input
              className="px-4 py-2 w-[200px] border-2 border-gray-300 rounded-lg ml-2"
              type="number"
              placeholder="Unit Price"
              value={editMode ? currentStore.ppu : newStore.ppu}
              onChange={(e) => editMode ? setCurrentStore({ ...currentStore, ppu: e.target.value }) : setNewStore({ ...newStore, ppu: e.target.value })}
              required
            />
            <input
              className="px-4 py-2 w-[200px] border-2 border-gray-300 rounded-lg ml-2"
              type="number"
              placeholder="Quantity"
              value={editMode ? currentStore.qnt : newStore.qnt}
              onChange={(e) => editMode ? setCurrentStore({ ...currentStore, qnt: e.target.value }) : setNewStore({ ...newStore, qnt: e.target.value })}
              required
            />
            
            <button className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600" type="submit">
              {editMode ? 'Update Store' : 'Add Store'}
            </button>
            {editMode && (
              <button
                className="px-4 py-2 ml-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setEditMode(false)}
                type="button"
              >
                Cancel
              </button>
            )}
            
          </div>
          
        </form>
        </div>

        {/* Close Button */}
        <div className="mt-8">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
