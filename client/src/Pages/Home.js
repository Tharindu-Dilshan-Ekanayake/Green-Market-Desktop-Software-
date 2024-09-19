import React from 'react'
import Nav from '../Components/Nav'
import Clients from '../Components/Clients'

export default function Home() {
  return (
    <div>
      <div>
        <Nav/>
      </div>

      <div className=''>
        <Clients/>
      </div>

      <div className='flex border-black border-2 w-screen'>
        <div className='w-1/2 border-2 border-black'>
            <h1>hi1</h1>
        </div>
        <div className='w-1/2 border-2 border-black'>
            <h1>hi2</h1>
        </div>
      </div>

      <div className='border-2 border-black'>
        <h1>hiii3</h1>
      </div>
    </div>
  )
}
