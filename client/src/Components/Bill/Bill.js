import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Bill() {
  const [clientInfo, setClientInfo] = useState('');
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  
  const [storeItems, setStoreItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [filteredStoreItems, setFilteredStoreItems] = useState([]);
  const [selectedStoreItem, setSelectedStoreItem] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/getclient');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();

    const fetchStoreItems = async () => {
      try {
        const response = await axios.get('/store/storeget');
        setStoreItems(response.data);
      } catch (error) {
        console.error('Error fetching store items:', error);
      }
    };
    fetchStoreItems();
  }, []);

  useEffect(() => {
    const results = clients.filter(client =>
      client.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.tp.includes(searchTerm)
    );
    setFilteredClients(results);
  }, [searchTerm, clients]);

  useEffect(() => {
    const results = storeItems.filter(item =>
      item.item.toLowerCase().includes(itemName.toLowerCase())
    );
    setFilteredStoreItems(results);
  }, [itemName, storeItems]);

  const handleAddItem = () => {
    const qnt = parseFloat(quantity);
    if (!selectedStoreItem || isNaN(qnt) || qnt <= 0) {
      alert('Please select an item and enter valid quantity.');
      return;
    }

    if (qnt > selectedStoreItem.qnt) {
      alert('Insufficient stock. Please enter a lower quantity.');
      return;
    }

    const itemPrice = selectedStoreItem.ppu;
    const newItem = { 
      name: selectedStoreItem.item, 
      quantity: qnt, 
      price: itemPrice,
      itemno: selectedStoreItem.itemno
    };

    setItems([...items, newItem]);
    setTotal(total + qnt * itemPrice);

    setItemName('');
    setQuantity('');
    setSelectedStoreItem(null);
  };

  const handleClear = () => {
    setClientInfo('');
    setSelectedClient(null);
    setItems([]);
    setTotal(0);
    setItemName('');
    setQuantity('');
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setClientInfo(`${client.fname} ${client.lname} - ${client.email} - ${client.tp}`);
    setSearchTerm('');
    setFilteredClients([]);
  };

  const handleStoreItemSelect = (item) => {
    setSelectedStoreItem(item);
    setItemName(item.item);
    setFilteredStoreItems([]);
  };

  const handleBill = async () => {
    if (!selectedClient || items.length === 0) {
      alert('Please select a client and add items to the bill.');
      return;
    }

    try {
      // Update store quantities
      await axios.put('/store/updateStoreQuantity', { items });

      // Save the bill to the database
      const billData = {
        clientId: selectedClient.tp, // Using client's phone number as clientId
        items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: total
      };

      const response = await axios.post('/bill/bills', billData);

      alert('Bill created successfully and store quantities updated.');
      console.log('Saved bill:', response.data);
      handleClear();
    } catch (error) {
      console.error('Error creating bill:', error);
      alert('Error creating bill. Please try again.');
    }
  };

  return (
    <div className="flex w-screen p-4">
      <div className="w-2/3 p-4 border">
        <div className="relative flex mb-2">
          <input
            className="w-[900px] p-2 border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter client phone number, email, or name"
          />
          <button className="p-2 text-white bg-blue-500" disabled={!selectedClient}>
            Select
          </button>

          {searchTerm && filteredClients.length > 0 && (
            <div className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border border-gray-300 rounded-lg max-h-60">
              {filteredClients.map(client => (
                <div
                  key={client._id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleClientSelect(client)}
                >
                  {client.fname} {client.lname} - {client.email} - {client.tp}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedClient && (
          <div className="p-2 mb-4 bg-gray-100 border rounded">
            <h2>Selected Client: {clientInfo}</h2>
          </div>
        )}

        <div className="relative flex gap-2 mb-2">
          <input
            className="flex-1 p-2 border"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Search Item"
          />

          {itemName && filteredStoreItems.length > 0 && (
            <div className="absolute z-10 w-full mt-2 overflow-y-auto bg-white border border-gray-300 rounded-lg max-h-60">
              {filteredStoreItems.map(item => (
                <div
                  key={item._id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleStoreItemSelect(item)}
                >
                  {item.item} - ${item.ppu.toFixed(2)} (Stock: {item.qnt})
                </div>
              ))}
            </div>
          )}

          <input
            className="flex-1 p-2 border"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            type="number"
          />
          <button onClick={handleAddItem} className="p-2 text-white bg-green-500">
            Add
          </button>
        </div>

        <div className="h-40 p-2 overflow-y-scroll border">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name} - {item.quantity} x ${item.price.toFixed(2)}</span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <h1>No items added yet</h1>
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={handleBill} className="p-2 text-white bg-blue-500">Bill</button>
          <button onClick={handleClear} className="p-2 text-white bg-red-500">Clear</button>
        </div>

        <div className="mt-2">
          <h2 className="text-xl text-right">Total: ${total.toFixed(2)}</h2>
        </div>
      </div>

      <div className="w-1/3 p-4 border">
        <h1>Print Bill</h1>
        {/* Add print bill functionality here */}
      </div>
    </div>
  );
}