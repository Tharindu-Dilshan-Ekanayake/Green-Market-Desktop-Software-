import React from 'react'
import LOGO from '../images/Logo.png'


export default function Nav() {
  return (
    <div className='justify-end flex items-center pl-10 pt-4  pr-10'>
        
        <div>
            <img src={LOGO} alt='hi' className='h-[90px]'></img>
        </div>
        
    </div>
  
  )
}
