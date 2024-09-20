
import React, { useState } from 'react'
import ViewStore from './ViewStore';

export default function StoreButton() {
    
    const [showStore, setShowStore] = useState(false);
    const handlestore = () =>{
        setShowStore(true)
    }

    const handleModalClose = () => {
        setShowStore(false);
    }
  return (
    <div>
      <div>
        <button onClick={handlestore} className="px-4 py-2 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105">Store</button>
      </div>
      <div>
        <ViewStore
            visible={showStore}
            onClose={handleModalClose}
        ></ViewStore>
      </div>
    </div>
  )
}
