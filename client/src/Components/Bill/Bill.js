import React from 'react'

export default function Bill() {
  return (
    <div className='flex w-screen'>
      <div className='w-2/3 border'>
        <input className=''placeholder='Enter client phone number or email or name' ></input>
        <button>Select</button>
        <div>
            <input className='' placeholder='item'></input>
            <input className='' placeholder='Qnt'></input>
            <input className='' placeholder='price'></input>
            <button>Add</button>
        </div>
        <div>
            <h1>Show added item and price scroll down canbe this div</h1>
        </div>
        <div>
            
        </div>
      </div>
      
      <div className='w-1/3 border'>
        <h1>Print bill</h1>
      </div>
    </div>
  )
}
