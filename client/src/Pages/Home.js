import React from 'react';
import Nav from '../Components/Nav';
import Clients from '../Components/Clients';
import StoreButton from '../Components/store/StoreButton';
import Bill from '../Components/Bill/Bill';

export default function Home() {
  return (
    <div>
      {/* Navigation */}
      <Nav />

      {/* Clients Section */}
      <div className='pt-3 pb-4'>
        <Clients />
      </div>
      <hr />

      {/* Billing Section */}
      <div className="w-screen h-[600px] flex justify-center bg-[#19191A] bg-opacity-5 pt-3 ">
        <div>
          <h1 className="px-4 text-2xl text-left text-green-600">Billing Section</h1>
          <Bill />
        </div>
      </div>
      <hr />

      {/* Store Button Section */}
      <div className="pt-4">
        <StoreButton />
      </div>

      {/* Footer */}
      
    </div>
  );
}
