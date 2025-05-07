import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Api from '../common/index.js'
import CategoryThreeBox from '../components/SearchThreeProducts.js'

const SearchProduct = () => {
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(Api.SearchProduct.url + location.search)
        const dataResponse = await response.json()
        if (dataResponse.success) {
            setProducts(dataResponse.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchProduct()
    }, [location])

    return (
        <div className='mt-40'>
            {
                loading && (
                    <p className='text-xl text-center italic font-semibold'>loading...</p>
                )
            }
            <h2 className='text-xl text-center italic font-semibold underline'>Search Results : <span className='text-pink-800'>{products.length}</span></h2>

            {
                products.length === 0 && !loading && (
                    <p className='text-xl text-center italic font-semibold'>No Products Found</p>
                )
            }

            {
                products.length !== 0 && !loading && (
                    <CategoryThreeBox products={products} />
                )
            }
        </div>
    )
}

export default SearchProduct