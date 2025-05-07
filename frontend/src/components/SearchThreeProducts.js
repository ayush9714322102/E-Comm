import React, { useState, useEffect } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct.js';
import DisplayCurrency from "../helpers/DisplayCurrency.js";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart.js';
import context from '../context/index.js';
import { useContext } from 'react';

const CategoryThreeBox = ({ category,products = null }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(10).fill(0);

    const { fetchUserAddToCart } = useContext(context);

    const handleaddToCart = async (e,id) => {
        await addToCart(e,id)
        fetchUserAddToCart();
    }

useEffect(() => {
    if (products && Array.isArray(products)) {
        setData(products);
        setLoading(false);
    }
}, [products]);

useEffect(() => {
    const fetchData = async () => {
        if (!products && category) {
            setLoading(true);
            const response = await fetchCategoryWiseProduct(category);
            setData(response?.data || []);
            setLoading(false);
        }
    };
    fetchData();
}, [category]);


    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-24'>
                {
                    loading ? (
                        loadingList.map((product, index) => (
                            <div key={index} className="w-full shadow-md overflow-hidden rounded animation-pulse">
                                <div className="p-2 grid">
                                    <div className='h-80 bg-slate-200 mb-2 animate-pulse'>
                                    </div>
                                    <h3 className="text-md mt-2 text-center h-12 overflow-hidden text-ellipsis font-medium p-1 animate-pulse rounded bg-slate-200 mb-2">{""}</h3>
                                    <div className='flex gap-2 justify-center'>
                                        <p className="text-md font-medium text-pink-800 p-1 animate-pulse rounded-full bg-slate-200 w-full"></p>
                                        <p className="text-sm text-slate-500 p-22 animate-pulse rounded-full bg-slate-200 w-full"></p>
                                    </div>
                                    <button className='text-md px-3 py-1 block mx-auto mt-2 bg-slate-200'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <Link to={`/product/${product?._id}`}
                                key={index}
                                className="w-full shadow-md overflow-hidden pb-5">
                                <div className="relative w-full h-[480px] overflow-hidden">
                                    <img
                                        src={product.productImage[0]}
                                        alt="Product"
                                        className="w-full object-contain absolute top-0 left-0 transition-opacity duration-100 opacity-100 hover:opacity-0"
                                    />
                                    {product.productImage[1] && (
                                        <img
                                            src={product.productImage[1]}
                                            alt="Product Hover"
                                            className="w-full object-contain absolute top-0 left-0 transition-opacity duration-700 opacity-0 hover:opacity-100"
                                        />
                                    )}
                                </div>
                                <div className="p-2 grid">
                                    <h3 className="text-lg mt-2 text-center h-20 overflow-hidden text-ellipsis font-medium">{product.productName}</h3>
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
                            </Link>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default CategoryThreeBox;
