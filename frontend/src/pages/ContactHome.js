import React from 'react'
import image from "../assets/banner/contact.jpg";
import { Link } from 'react-router-dom';

const ContactHome = () => {
    return (
        <div className='container mx-auto'>
            <div className='flex items-center justify-center relative border-t-2 border-gray-300'>
                <img src={image} alt='contact' />
                <div className='absolute'>
                    <h2 className='uppercase text-white text-3xl font-semibold'>Experience In-Store Video Assistance</h2>
                    <p className='text-center text-white font-semibold py-4'>Our Stylists On Call Can Speak: English, Hindi & Gujarati</p>
                    <button className='uppercase text-white bg-pink-800 py-3 px-8 mx-auto block mt-3'><Link to="https://api.whatsapp.com/send?phone=919974132716" target='_blank' className=''>Contact now</Link></button>
                </div>
            </div>

        </div>
    )
}

export default ContactHome