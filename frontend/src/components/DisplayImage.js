import React from 'react'
import { CgClose } from "react-icons/cg";

const DisplayImage = ({
  imgurl,
  onClose,
}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
      <div className='bg-white shadow-lg rounded mt-40 mx-auto px-3'>
        <div className='w-fit ml-auto text-2xl hover:text-pink-800 cursor-pointer' onClick={onClose}>
          <CgClose />
        </div>

        <div className='flex justify-center p-2 max-w-[57vh] max-h-[76vh]'>
          <img src={imgurl} alt='' className='w-full h-68' />
        </div>
      </div>
    </div>
  )
}

export default DisplayImage