import React, { useState, useEffect, useRef } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct.js';
import DisplayCurrency from "../helpers/DisplayCurrency.js";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart.js';
import context from '../context/index.js';
import { useContext } from 'react';

const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(10).fill(0);
    const scrollRef = useRef(null);

    const { fetchUserAddToCart } = useContext(context);

    const handleaddToCart = async (e,id) => {
        await addToCart(e,id)
        fetchUserAddToCart();
    }

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            const categoryProduct = await fetchCategoryWiseProduct(category);
            setLoading(false);
    
            setData(categoryProduct?.data);
        };

        fetchData();
    }, [category]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({
            top: 0,
            left: -300,
            behavior: 'smooth'
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
            top: 0,
            left: 300,
            behavior: 'smooth'
        });
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <div className='flex justify-center my-12'>
                <h2 className='text-3xl px-1 text-center text-white bg-pink-800 uppercase tracking-wider'>{heading}</h2>
            </div>

            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 border-2 border-white bg-white text-pink-800 p-1 ms-6 rounded-full z-10 text-4xl"><MdKeyboardArrowLeft />
            </button>

            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 border-2 border-white bg-white text-pink-800 p-1 me-6 rounded-full z-10 text-4xl"><MdKeyboardArrowRight />
            </button>

            <div
                ref={scrollRef}
                className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbarnone scroll-smooth'>
                {
                    loading ? (
                        loadingList.map((product, index) => (
                            <div key={index} className="w-full min-w-[280px] md:min-w-[290px] max-w-[280px] md:max-w-[290px] h-auto shadow-md overflow-hidden rounded animation-pulse">
                                <div className="p-2 grid">
                                    <div className='h-80 bg-slate-200 mb-2 animate-pulse'>
                                    </div>
                                    <h3 className="text-md mt-2 text-center h-20 overflow-hidden text-ellipsis font-medium p-1 animate-pulse rounded-full bg-slate-200">{}</h3>
                                    <div className='flex gap-2 justify-center'>
                                        <p className="text-md font-medium text-pink-800 p-1 animate-pulse rounded-full bg-slate-200 w-full"></p>
                                        <p className="text-sm text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 w-full"></p>
                                    </div>
                                    <button className='text-md px-3 py-1 block mx-auto mt-2 bg-slate-200'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <Link to={"product/" + product?._id}
                                key={index}
                                className="w-full min-w-[280px] md:min-w-[290px] max-w-[280px] md:max-w-[290px] h-auto shadow-lg overflow-hidden rounded">
                                <div className="relative w-full h-[450px] overflow-hidden">
                                    <img
                                        src={product.productImage[0]}
                                        alt="Product"
                                        className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-100 opacity-100 hover:opacity-0"
                                    />
                                    {product.productImage[1] && (
                                        <img
                                            src={product.productImage[1]}
                                            alt="Product Hover"
                                            className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-75 opacity-0 hover:opacity-100"
                                        />
                                    )}
                                </div>
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
                                    <button className='text-md bg-pink-800 hover:bg-pink-700 text-white px-3 py-1 block mx-auto mt-2' onClick={(e)=>handleaddToCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        ))
                    )

                }
            </div>
        </div>
    );
};

export default VerticalCardProduct;
