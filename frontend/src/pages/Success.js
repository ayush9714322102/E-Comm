import React from 'react'
import { BsPatchCheckFill } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';


const Success = () => {
  const location = useLocation();
  const { orderId } = location.state || {};
console.log("Order ID: ", orderId)
  return (
    <div className='mt-40 bg-slate-100 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-1 rounded'>
        <BsPatchCheckFill className='text-8xl text-green-600 m-4'/>
        <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
        {orderId && (
        <Link
          to={"/order"}
          state={{ orderId }}
          className='p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>
          See Order
        </Link>
      )}
    </div>
  )
}

export default Success