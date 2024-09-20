import React from 'react'

export default function ModifyClient({visible, onClose, onClientModifieded}) {
    
    if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg  w-[1000px] h-[800px]">
        <div>
        <input 
            className="px-4 py-2 w-[400px] border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
            type="text" 
            placeholder="Search Email or Phone or Name..." 
          />
        </div>
        <div className='h-[600px] border mt-8'>
          <h1>list</h1>
        </div>
        <div className='mt-8'>
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
  )
}
