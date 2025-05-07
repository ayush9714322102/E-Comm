import React from 'react'
import { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/DisplayCurrency';

const AdminProductCard = ({
    data,
    fetchdata,
}) => {
    const [editProduct, setEditProduct] = useState(false)
    return (
        <div className='bg-rose-50 p-4 rounded'>
            <div className='w-48'>
                <img src={data.productImage[0]} alt='' width={120} height={120} className='w-fit mx-auto' />
                <h1 className='mt-2 text-center h-20 overflow-hidden text-ellipsis'>{data.productName}</h1>

                <div>
                    <p className='font-semibold text-center text-lg'>
                        {
                            displayINRCurrency(data.sellingPrice)
                        } 
                    </p>

                    <div className='w-fit p-2 ml-auto text-white bg-rose-400 hover:bg-rose-600 hover:text-white cursor-pointer rounded-full' onClick={() => setEditProduct(true)}>
                        <MdModeEdit />
                    </div>
                </div>

            </div>

            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }
        </div>
    )
}

export default AdminProductCard