
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
    <div className='flex justify-end px-5'>
      <div>
        <button onClick={handlestore} className="w-[100px] h-[100px] py-2 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105">Store</button>
      </div>
      <div className='ml-5'>
        <button  className="w-[100px] h-[100px] py-2 font-semibold text-white transition duration-300 ease-in-out transform bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 hover:scale-105">Sales</button>
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
