import React from 'react'
import { Link } from 'react-router-dom'
import { BiXCircle } from "react-icons/bi";

const Cancel = () => {
    return (
        <div className='mt-40 bg-slate-100 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-1 rounded'>
            <BiXCircle className='text-8xl text-red-600 m-4' />
            <p className='text-red-600 font-bold text-xl'>Payment Cancel</p>
            <Link to={"/cart"} className='p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go To Cart</Link>
        </div>
    )
}

export default Cancel