import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProducts, setAllProducts] = useState([])

  const fetchAllProducts = async () => {
    const response = await fetch(SummaryApi.getAllProduct.url)
    const dataResponse = await response.json()

    setAllProducts(dataResponse?.data || [])
  }

  // ✅ useEffect should be directly in component body
  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div>
      <div className='bg-pink-50 py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button
          className='border border-pink-800 text-pink-800 hover:bg-pink-800 hover:text-white py-1 px-4 rounded-full transition-all'
          onClick={() => setOpenUploadProduct(true)}
        >
          Add Product
        </button>
      </div>

      {/* All Products */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProducts.map((product, index) => (
            <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProducts}/>
          ))
        }
      </div>

      {/* Upload Product Component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchdata={fetchAllProducts}/>
        )
      }
    </div>
  )
}

export default AllProducts
