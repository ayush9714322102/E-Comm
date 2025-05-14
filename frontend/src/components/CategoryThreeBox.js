import React, { useState, useEffect } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct.js';
import DisplayCurrency from "../helpers/DisplayCurrency.js";
import { Link, useNavigate } from 'react-router-dom';
import addToCart from '../helpers/addToCart.js';
import context from '../context/index.js';
import { useContext } from 'react';
import Api from '../common/index.js';
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const CategoryThreeBox = ({ category, heading, content, products = null }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(10).fill(0);

    const { fetchUserAddToCart } = useContext(context);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { fetchAddTocart, fetchWishlist } = useContext(context);
    const navigate = useNavigate();

    const handleaddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart();
        navigate("/cart")
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

    const addToWishlist = async (productId) => {
        const response = await fetch(Api.addToWishlist.url, {
            method: Api.addToWishlist.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId })
        });

        const data = await response.json();
        if (data.success) {
            toast.success("Added to wishlist");
            setIsWishlisted(prev => ({...prev, [productId]:true}));
            fetchWishlist();
        } else {
            toast.error(data.message);
        }
    };


    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <div className='py-2 border-b border-slate-200 mb-5'>
                <h2 className='text-4xl py-5 text-center mb-2 uppercase'>{heading}</h2>
                <p className='mx-auto text-center w-[700px] pb-2'>{content}</p>
            </div>
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
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault();
                                            addToWishlist(product._id);
                                        }}
                                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-100 transition-all z-10"
                                        title="Add to Wishlist">
                                            {isWishlisted[product._id] ? (
                                                <AiFillHeart size={24} className="text-red-500" />
                                            ):
                                            (
                                                <AiOutlineHeart size={24} className="text-gray-500 hover:bg-red-500" />
                                            )}
                                    </button>
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
