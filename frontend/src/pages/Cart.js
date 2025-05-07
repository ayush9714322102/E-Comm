import React, { useEffect, useState, useContext } from 'react'
import SummaryApi from "../common/index.js";
import Context from '../context/index.js'
import displayCurrency from "../helpers/DisplayCurrency.js";
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context);
    const loadingCart = new Array(context.CartProductCount).fill(null)

    const fetchData = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.addToCartViewProduct.url, {
            method: SummaryApi.addToCartViewProduct.method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        setLoading(false)
        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data);
        }

    }

    useEffect(() => {
        fetchData()
    }, [])

    const insertQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateAddToCartProduct.url, {
            method: SummaryApi.updateAddToCartProduct.method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })
        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const decresQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateAddToCartProduct.url, {
                method: SummaryApi.updateAddToCartProduct.method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            })
            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteProduct = async (id, qty) => {
        const response = await fetch(SummaryApi.deleteAddToCartProduct.url, {
            method: SummaryApi.deleteAddToCartProduct.method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                _id: id,
            })
        })
        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousvalue, currentvalue) => previousvalue + currentvalue?.quantity, 0)
    const totalPrice = data.reduce((previousvalue, currentvalue) => previousvalue + (currentvalue?.productId?.sellingPrice * currentvalue?.quantity), 0)

    return (
        <div className='mt-40 container mx-auto px-10'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-rose-50 py-5'>No Data</p>
                    )
                }
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-2'>
                {/* View Product */}
                <div className='w-full max-w-5xl'>
                    {
                        loading ? (
                            loadingCart.map((_, index) => {
                                return (
                                    <div key={`loading-skeleton-${index}`} className='w-full bg-slate-200 h-40 border border-slate-300 animate-pulse rounded my-2'>
                                    </div>
                                )
                            })
                        ) : (
                            data.map((product) => {
                                return (
                                    <div key={product?._id} className='w-full bg-rose-50 h-auto border border-rose-200 rounded my-2 p-2 grid grid-cols-[128px,1fr]'>
                                        <div className='w-28 h-full'>
                                            <img src={product?.productId?.productImage[0]} className='w-full object-contain h-full' alt='' />
                                        </div>
                                        <div className='px-4 py-2 relative'>

                                            {/* Delete Product */}
                                            <div className='absolute right-0 p-2 bg-rose-500 rounded-full text-white hover:bg-green-600 cursor-pointer' onClick={() => deleteProduct(product?._id, product?.quantity)}>
                                                <MdDelete />
                                            </div>

                                            <h2 className='taxt-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize mt-2 text-lg text-slate-600'>{product?.productId?.productCategory}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='font-medium text-lg mt-2'>{displayCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg mt-2'>{displayCurrency(product?.productId?.sellingPrice * product.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-3'>
                                                <button className='w-7 h-7 flex justify-center items-center text-lg bg-rose-500 text-white' onClick={() => decresQty(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='w-7 h-7 flex justify-center items-center text-lg bg-rose-500 text-white' onClick={() => insertQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }

                </div>

                {/* Total Product */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse rounded'>
                            </div>
                        ) : (
                            <div className='h-40 bg-rose-50'>
                                <h2 className='text-white bg-rose-600 px-4 py-2'>Summary</h2>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg mt-2'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg my-2'>
                                    <p>Total Price</p>
                                    <p>{displayCurrency(totalPrice)}</p>
                                </div>

                                <button className='bg-blue-600 p-2 text-white w-full uppercase'>Payment</button>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Cart