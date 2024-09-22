import React from 'react'

export default function Sale({visible, onClose}) {
    if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[1000px] h-[800px]">


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
  )
}
