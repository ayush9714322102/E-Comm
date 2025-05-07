import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/index.js'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(5).fill(null)

    const allowedCategories = ['wedding', 'tuxedo', 'reception', 'kurta', 'mehendi']

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.catagoryproduct.url)
        const dataResponse = await response.json()
        setLoading(false)

        const filteredData = dataResponse.data.filter(product =>
            allowedCategories.includes(product.productCategory)
        )
        setCategoryProduct(filteredData)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <div className='container mx-auto overflow-x-hidden my-3 py-10'>
            <div className='flex overflow-x-auto lg:justify-center whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 w-full gap-5'>
                {
                    loading ? (
                        categoryLoading.map((p, index) => {
                            return (
                                <div className='w-full h-28 md:h-72 lg:h-80 overflow-hidden shadow-md bg-slate-200' key={index}></div>
                            )
                        })
                    ) : (
                        categoryProduct.map((product, index) => (
                            <Link to={`/productcategory?category=${product?.productCategory}`} key={index} className='inline-block w-32 md:w-48 lg:w-56 mx-4 flex-shrink-0'>
                                <div className='w-full h-28 md:h-72 lg:h-80 overflow-hidden shadow-md'>
                                    <img src={product?.productImage[0]} alt={product?.productCategory} className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' />
                                </div>
                                <p className='text-center mt-2 text-xs md:text-sm lg:text-lg font-medium capitalize text-gray-800'>{product?.productCategory}</p>
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default CategoryList
