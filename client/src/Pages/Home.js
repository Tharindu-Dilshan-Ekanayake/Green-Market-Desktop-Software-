import React from 'react'
import Nav from '../Components/Nav'
import Clients from '../Components/Clients'
import StoreButton from '../Components/store/StoreButton'

export default function Home() {
  return (
    <div>
      <div>
        <Nav/>
      </div>

      <div className=''>
        <Clients/>
      </div>

      <div className='flex w-screen border-2 border-black h-[650px]'>
        <div className='w-1/2 border-2 border-black'>
            <h1>hi1</h1>
        </div>
        <div className='w-1/2 border-2 border-black'>
            <h1>hi2</h1>
        </div>
      </div>

      <div className='pt-5'>
      <div>
        <StoreButton/>
      </div>
      </div>
    </div>
  )
}
