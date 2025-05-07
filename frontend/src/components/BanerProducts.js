import React from 'react'
import image from "../assets/banner/riyasaat_2.webp";

const BanerProducts = () => {
  return (
    <div className='container mx-auto overflow-hidden'>
        <div className='h-full w-full bg-pink-500'>
            <img src={image} alt='baner' className='w-full h-full'/>
        </div>
    </div>
  )
}

export default BanerProducts