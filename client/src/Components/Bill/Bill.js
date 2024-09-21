import React, { useState } from 'react';

export default function Bill() {
  const [clientInfo, setClientInfo] = useState('');
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState(0);

  const handleAddItem = () => {
    const qnt = parseFloat(quantity);
    const itemPrice = parseFloat(price);
    
    if (!itemName || isNaN(qnt) || isNaN(itemPrice)) {
      alert('Please fill out all fields with valid data.');
      return;
    }

    const newItem = { name: itemName, quantity: qnt, price: itemPrice };
    
    setItems([...items, newItem]);
    setTotal(total + qnt * itemPrice);
    
    // Clear the input fields after adding
    setItemName('');
    setQuantity('');
    setPrice('');
  };

  const handleClear = () => {
    setClientInfo('');
    setItems([]);
    setTotal(0);
    setItemName('');
    setQuantity('');
    setPrice('');
  };

  return (
    <div className="flex w-screen p-4">
      {/* Input Section */}
      <div className="w-2/3 p-4 border">
        <input 
          className="w-full p-2 mb-2 border" 
          value={clientInfo} 
          onChange={(e) => setClientInfo(e.target.value)} 
          placeholder="Enter client phone number or email or name" 
        />
        <button className="p-2 mb-4 text-white bg-blue-500">Select</button>

        <div className="flex gap-2 mb-2">
          <input 
            className="flex-1 p-2 border" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            placeholder="Item" 
          />
          <input 
            className="flex-1 p-2 border" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            placeholder="Quantity" 
            type="number"
          />
          <input 
            className="flex-1 p-2 border" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="Price" 
            type="number"
          />
          <button 
            onClick={handleAddItem} 
            className="p-2 text-white bg-green-500"
          >
            Add
          </button>
        </div>

        {/* Display Added Items */}
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
          <button className="p-2 text-white bg-blue-500">Bill</button>
          <button onClick={handleClear} className="p-2 text-white bg-red-500">Clear</button>
        </div>

        <div className="mt-2">
          <h2 className="text-xl text-right">Total: ${total.toFixed(2)}</h2>
        </div>
      </div>

      {/* Print Section */}
      <div className="w-1/3 p-4 border">
        <h1>Print Bill</h1>
        {/* You can add more details here for printing the bill */}
      </div>
    </div>
  );
}
