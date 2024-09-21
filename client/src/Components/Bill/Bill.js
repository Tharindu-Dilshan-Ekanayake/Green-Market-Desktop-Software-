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
  const [isBillCreated, setIsBillCreated] = useState(false);
  const [billData, setBillData] = useState(null);

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
    if (isBillCreated) return;

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
    setIsBillCreated(false);
    setBillData(null);
  };

  const handleClientSelect = (client) => {
    if (isBillCreated) return;
    setSelectedClient(client);
    setClientInfo(`${client.fname} ${client.lname} - ${client.email} - ${client.tp}`);
    setSearchTerm('');
    setFilteredClients([]);
  };

  const handleStoreItemSelect = (item) => {
    if (isBillCreated) return;
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
      await axios.put('/store/updateStoreQuantity', { items });

      const billData = {
        clientId: selectedClient.tp,
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
      setIsBillCreated(true);
      setBillData(response.data);
    } catch (error) {
      console.error('Error creating bill:', error);
      alert('Error creating bill. Please try again.');
    }
  };

  const handlePrint = () => {
    const printContents = document.getElementById('printable-bill').innerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1, h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  const handleEmail = () => {
    // Implement email functionality here
    alert('Email functionality not implemented yet.');
  };

  const handleSMS = () => {
    // Implement SMS functionality here
    alert('SMS functionality not implemented yet.');
  };

  return (
    <div className="flex w-screen p-4">
      {/* Left Side: Create Bill Section */}
      <div className="w-1/2 p-4 border">
        <div className="relative flex justify-between mb-2">
          <input
            className="w-[1000px] p-2 border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter client phone number, email, or name"
            disabled={isBillCreated}
          />
          <button 
            className={`ml-8 px-2 py-2 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 w-[200px] ${isBillCreated || !selectedClient ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isBillCreated || !selectedClient}
          >
            Select
          </button>

          {searchTerm && filteredClients.length > 0 && !isBillCreated && (
            <div className="absolute z-10 w-[1000px] mt-12 overflow-y-auto bg-white border border-gray-300 rounded-lg max-h-60">
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
        <div className="p-2 mb-4 border rounded">
          {selectedClient ? (
            <div>
              <h2>{clientInfo}</h2>
            </div>
          ) : (
            <h1>No client selected</h1>
          )}
        </div>

        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 p-2 border"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Search Item"
            disabled={isBillCreated}
          />

          {itemName && filteredStoreItems.length > 0 && !isBillCreated && (
            <div className="absolute z-10 w-[300px] mt-12 overflow-y-auto bg-white border border-gray-300 rounded-lg max-h-60">
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
            className="flex-1 p-2 border w-[100px]"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            type="number"
            disabled={isBillCreated}
          />
          <button 
            onClick={handleAddItem} 
            className={`ml-5 px-2 py-2 font-semibold text-white transition duration-300 ease-in-out transform bg-green-500 rounded-lg shadow-md hover:bg-green-600 hover:scale-105 w-[100px] ${isBillCreated ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isBillCreated}
          >
            Add
          </button>
        </div>

        <div className="h-[200px] p-2 overflow-y-scroll border">
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

        <div className="flex justify-center mt-4">
         
          <button 
            onClick={handleBill} 
            className={`px-4 py-2 ml-2 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 ${isBillCreated ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isBillCreated}
          >
            Create Bill
          </button>
        </div>
        <div className="mt-2">
          <h2 className="text-3xl text-right text-green-600">Total: ${total.toFixed(2)}</h2>
        </div>
      </div>

      {/* Right Side: Print Bill Section */}
      <div className="w-1/2 p-4 border">
        <div id="printable-bill" className="p-4 mt-4 overflow-y-auto border h-[440px]">
          <h1 className="text-2xl font-bold text-center">Welcome</h1>
          <h2 className="text-left">Customer name: <strong>{selectedClient ? `${selectedClient.fname} ${selectedClient.lname}` : 'N/A'}</strong></h2>
          <h2 className="text-left">Customer mobile: <strong>{selectedClient ? `${selectedClient.tp}` : 'N/A'}</strong></h2>
          <h3 className="text-left">Date: <strong>{new Date().toLocaleDateString()}</strong></h3>
          <table className="w-full mt-4">
            <thead>
              <tr>
                <th className="border">Item</th>
                <th className="border">Quantity</th>
                <th className="border">Price</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index}>
                    <td className="border">{item.name}</td>
                    <td className="border">{item.quantity}</td>
                    <td className="border">${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center border">No items added</td>
                </tr>
              )}
              <tr>
                <td colSpan="2" className="font-bold border">Total</td>
                <td className="font-bold border">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='ml-12'>
        <div>
          <button 
            onClick={handlePrint} 
            className={`px-4 py-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 w-[200px] h-16 ${!isBillCreated ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isBillCreated}
          >
            Print Bill
          </button>
        </div>
        
        <div className='mt-12'>
          <button 
            onClick={handleEmail}
            className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 w-[200px] h-16 ${!isBillCreated ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isBillCreated}
          >
            Send Email
          </button>
        </div>
        <div className='mt-12'>
          <button 
            onClick={handleSMS}
            className={`px-4 py-2 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 w-[200px] h-16 ${!isBillCreated ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isBillCreated}
          >
            Send SMS
          </button>
        </div>
        <div className='mt-12'>
        <button 
            onClick={handleClear} 
            className="px-4 py-2 mr-2 font-semibold text-white transition duration-300 ease-in-out transform bg-red-500 rounded-lg shadow-md hover:bg-red-600 hover:scale-105 w-[200px] h-16"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}