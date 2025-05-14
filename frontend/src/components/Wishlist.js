import React, { useContext, useEffect, useState } from 'react';
import Api from '../common/index.js';
import { toast } from 'react-toastify';
import displayINRcurrency from '../helpers/DisplayCurrency.js';
import Context from '../context/index.js';
import addToCart from "../helpers/addToCart.js";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";


const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const context = useContext(Context);

    const { fetchUserAddToCart } = useContext(Context);

    const handleaddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart();
    }

    const fetchWishlist = async () => {
        try {
            const res = await fetch(Api.getWishlist.url, {
                method: Api.getWishlist.method,
                credentials: 'include'
            });
            const data = await res.json();
            console.log("👀 Wishlist API response:", data);
            if (data.success) {
                // Support both array or object-with-key
                const list = Array.isArray(data.data)
                    ? data.data
                    : (data.data.wishlist || []);
                setWishlist(list);
            } else {
                toast.error(data.message || "Failed to fetch wishlist");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };


    const removeFromWishlist = async (id) => {
        try {
            const res = await fetch(Api.deleteWishlist.url(id), {
                method: Api.deleteWishlist.method,
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                fetchWishlist();
                context.fetchWishlist();
                toast.success("Removed from wishlist");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Something went wrong!");
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    if (wishlist.length === 0) return <p className="text-center text-xl py-20">Your Wishlist is empty</p>;

    return (
        <div className="p-6 max-w-screen-xl mx-auto mt-40">
            <h1 className="text-2xl font-medium mb-4 uppercase justify-center flex gap-3">My Wishlist<span className='mt-1 text-red-600'><FaHeart /></span></h1>
            <div className="grid grid-cols-1 gap-6">
                {wishlist.map((product, idx) => (
                    <div key={idx} className="p-4 border border-pink-800 rounded shadow bg-white flex justify-between items-center">
                        <div className="flex gap-6">
                            <img src={product?.productImage?.[0] || "https://via.placeholder.com/100"} alt={product.productName} className="w-24 h-auto object-contain" />
                            <div className='py-1'>
                                <p className="font-semibold text-lg">{product.productName}</p>
                                <div className='flex items-center gap-2 py-5'>
                                    <p className='font-medium text-lg'>{displayINRcurrency(product?.sellingPrice)}</p>
                                    <p className='text-slate-500 font-semibold text-md mt-2 '><del>{displayINRcurrency(product?.productPrice)}</del></p>
                                </div>
                                <button className='text-md border-2 border-pink-800 py-1 px-2 hover:bg-pink-800 hover:text-white text-black' onClick={(e) => handleaddToCart(e, product?._id)}>Add To Cart</button>
                            </div>
                        </div>
                        <button
                            className="group p-2 hover:text-white hover:bg-red-600 text-xl border border-slate-400 rounded-full"
                            onClick={() => removeFromWishlist(product._id)}>
                            <MdDelete className="" />
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;