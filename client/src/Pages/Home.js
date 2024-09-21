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
      <hr></hr>

      <div className=' w-screen   h-[650px] flex justify-center bg-[#19191A] bg-opacity-5 pt-3 '>
        <div>
          <h1 className='px-4 text-2xl text-left'><storage>BILL </storage></h1>
          <Bill/>
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
