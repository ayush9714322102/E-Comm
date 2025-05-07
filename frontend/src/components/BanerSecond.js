import React from 'react'
import image from "../assets/banner/second.webp";

const BanerSecond = () => {
    return (
        <div className='container mx-auto overflow-hidden'>
            <div className='h-full w-full bg-pink-500'>
                <img src={image} alt='baner' className='w-full h-full' />
            </div>
        </div>
    )
}

export default BanerSecond