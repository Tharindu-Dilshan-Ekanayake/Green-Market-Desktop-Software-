
import React, { useState } from 'react'
import ViewStore from './ViewStore';
import { FaStore } from "react-icons/fa";
import { TbFileAnalytics } from "react-icons/tb";
import Sale from '../sale/Sale';

export default function StoreButton() {
    
    const [showStore, setShowStore] = useState(false);
    const handlestore = () =>{
        setShowStore(true)
    }

    const [showSale, setShowSale] = useState(false);
    const handlesale = ()=> {
      setShowSale(true)
    }

    const handleModalClose = () => {
        setShowStore(false);
        setShowSale(false)
    }
  return (
    <div className='flex justify-end px-5'>
      <div>
        <button onClick={handlestore} className="w-[100px] h-[100px] py-2 font-semibold text-white transition duration-300 ease-in-out transform bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105">
          
          <div>
            <div className='flex justify-center '>
              <FaStore className='size-10' />
            </div>
            <div>
              Store
            </div>
          </div>
        </button>
      </div>
      <div className='ml-5'>
        <button onClick={handlesale}  className="w-[100px] h-[100px] py-2 font-semibold text-white transition duration-300 ease-in-out transform bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 hover:scale-105">
          <div>
            <div className='flex justify-center '>
              <TbFileAnalytics className='size-10' />
            </div>
            <div>
              Sales
            </div>
          </div>
        </button>
      </div>
      <div>
        <ViewStore
            visible={showStore}
            onClose={handleModalClose}
        ></ViewStore>
      </div>
      <div>
        <Sale
          visible={showSale}
          onClose={handleModalClose}
        />
      </div>
    </div>
  )
}
