import React, { useState, useEffect, useRef } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct.js'
import DisplayCurrency from "../helpers/DisplayCurrency.js";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import context from '../context/index.js';
import { useContext } from 'react';


const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)
    setData(categoryProduct?.data)
  }

  const { fetchUserAddToCart } = useContext(context);

  const handleaddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart();
  }

  useEffect(() => {
    fetchData()
  }, [category])

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: -300,
      behavior: 'smooth',
    })
  }

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: 300,
      behavior: 'smooth',
    })
  }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-3xl font-semibold py-5'>{heading}</h2>


      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 border-2 border-pink-800 bg-white text-pink-800 p-1 ms-6 rounded-full z-10 text-4xl"><MdKeyboardArrowLeft />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 border-2 border-pink-800 bg-white text-pink-800 p-1 me-6 rounded-full z-10 text-4xl"><MdKeyboardArrowRight />
      </button>

      <div
        ref={scrollRef}
        className='flex items-center gap-4 md:gap-6 overflow-x-auto scrollbarnone scroll-smooth'>
        {
          data.map((product, index) => (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[290px] max-w-[280px] md:max-w-[290px] h-auto shadow-md overflow-hidden rounded"
            >
              <img
                src={product.productImage[0]}
                alt=""
                className="w-full object-contain"
              />
              <div className="p-2 grid">
                <h3 className="text-md mt-2 text-center h-20 overflow-hidden text-ellipsis font-medium">{product.productName}</h3>
                <div className='flex gap-2 justify-center'>
                  <p className="text-lg font-medium text-pink-800">{DisplayCurrency(product.sellingPrice)}</p>
                  {
                    product?.sellingPrice < product?.productPrice && (
                      <>
                        <p className="text-sm text-slate-500 line-through">{DisplayCurrency(product.productPrice)}</p>
                        <p className="text-sm text-green-500 font-semibold">({Math.round(((product.productPrice - product.sellingPrice) / product.productPrice) * 100)}% OFF)</p>
                      </>
                    )
                  }
                </div>
                <button className='text-md bg-pink-800 hover:bg-pink-700 text-white px-3 py-1 block mx-auto mt-2' onClick={(e) => handleaddToCart(e, product?._id)}>Add to Cart</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default HorizontalCardProduct
