import React from 'react'

export default function ModifyClient({visible, onClose, onClientModifieded}) {
    
    if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg  w-[1000px] h-[800px]">
      <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
      </div>
    </div>
  )
}
