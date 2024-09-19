import React, { useState } from 'react';
import AddClient from './AddClient';
import ModifyClient from './ModifyClient';


export default function Clients() {

    const [showModal1,setShowModal1] = useState(false);
    const handleaddclient = () => {
        setShowModal1(true);
    }

    const [showModal2, setShowModal2] = useState(false);
    const handlemodifyclient = () => {
        setShowModal2(true);
    }

    const handlemodalclose = async() =>{
        setShowModal1(false);
        setShowModal2(false)
    }

  return (
    <div className="p-6">
      <div className="flex items-center justify-center space-x-4">
        <div>
          <input 
            className="px-4 py-2 w-[400px] border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
            type="text" 
            placeholder="Search Email or Phone or Name..." 
          />
        </div>
        
        <div>
          <button 
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handleaddclient()}
          >
            Add Client
          </button>
        </div>
        <div>
          <button 
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => handlemodifyclient()}
          >
            Clients
          </button>
        </div>
      </div>
      <div>
        <AddClient
            visible={showModal1}
            onClose={handlemodalclose}
        ></AddClient>
      </div>
      <div>
        <ModifyClient
            visible={showModal2}
            onClose={handlemodalclose}
        />
      </div>
    </div>
  );
}
