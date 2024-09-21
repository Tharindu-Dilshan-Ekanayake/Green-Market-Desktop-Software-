import React from 'react'
import Nav from '../Components/Nav'
import Clients from '../Components/Clients'
import StoreButton from '../Components/store/StoreButton'
import Bill from '../Components/Bill/Bill'

export default function Home() {
  return (
    <div>
      <div>
        <Nav/>
      </div>

      <div className=''>
        <Clients/>
      </div>

      <div className=' w-screen border-2 border-black h-[650px] flex justify-center items-center'>
        <Bill/>
      </div>

      <div className='pt-5'>
      <div>
        <StoreButton/>
      </div>
      </div>
    </div>
  )
}
