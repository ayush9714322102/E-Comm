import React, { useContext, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import loadRazorpayScript from "../helpers/razorpayScript.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common/index.js";
import Context from '../context/index.js';

const OrderForm = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        mobile: '',
        landmark: ''
    });

    const location = useLocation();
    const totalPrice = location.state?.totalPrice || 0;

    const [error, setErrors] = useState({});

    const validateDeliveryinfo = () => {
        const newErrors = {};
        if (!formData.fullname) newErrors.fullname = "Name Is Required";
        if (!formData.address) newErrors.address = "Address Is Required";
        if (!formData.city) newErrors.city = "City Is Required";
        if (!formData.state) newErrors.state = "State Is Required";
        if (!formData.pincode) newErrors.pincode = "Pincode Is Required";
        if (!formData.mobile) newErrors.mobile = "Mobile Number Is Required";
        if (!formData.email) newErrors.email = "Email ID Is Required";
        return newErrors
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckout = async () => {
        const validationErrors = validateDeliveryinfo();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (totalPrice < 1) {
            toast.error("Total Price Should Be Greater Than 0");
            return;
        }

        const res = await loadRazorpayScript();
        if (!res) {
            toast.error("Razorpay SDK failed to load.");
            return;
        }

        try {
            const orderResponse = await fetch(SummaryApi.createOrder.url, {
                method: SummaryApi.createOrder.method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    userId: context?.user?._id,
                    deliveryInfo: formData,
                    amount: totalPrice,
                })
            });

            console.log("Order response:", orderResponse);



            const data = await orderResponse.json();

            if (!data.success) {
                toast.error("Failed to create order." + data.message);
                return;
            }

            const options = {
                key: "rzp_test_VLWNcRSixFt4ou",
                amount: data.order.amount,
                currency: "INR",
                name: "Your Shop Name",
                description: "Order Payment",
                order_id: data.order.id,
                handler: async function (response) {
                    const verifyResponse = await fetch(SummaryApi.verifyPayment.url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            formData,
                        })
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyResponse.ok && verifyData.success) {
                        toast.success("Payment Successful!");
                        context.fetchUserAddToCart();
                        navigate("/order");
                    } else {
                        toast.error("Payment Verification Failed!");
                    }
                },

                prefill: {
                    name: formData.fullname,
                    contact: formData.mobile,
                },
                theme: {
                    color: "#900C3F"
                }
            };

            const razor = new window.Razorpay(options);
            razor.open();

        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Something went wrong during checkout.");
        }
    };

    return (
        <form className="max-w-2xl mx-auto p-4 space-y-6 mt-40 max-h-auto">

            <div>
                <h2 className="text-xl font-semibold text-center uppercase mb-4 bg-pink-800 text-white py-1">Delivery Form</h2>
                <h2 className="text-lg font-semibold mb-2">Contact</h2>
                <div className="flex gap-2 mb-2">
                    <input
                        type="email"
                        value={formData.email}
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    {error.email && <p className='text-red-500 text-xs'>{error.email}</p>}
                </div>

                <h2 className="text-lg font-semibold mb-2">Delivery</h2>

                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={formData.fullname}
                        name="fullname"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                    {error.fullname && <p className='text-red-500 text-xs'>{error.fullname}</p>}
                </div>

                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    placeholder="Address"
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-2"
                    required
                />
                {error.address && <p className='text-red-500 text-xs'>{error.address}</p>}

                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        placeholder="City"
                        onChange={handleChange}
                        className="w-1/3 border p-2 rounded"
                        required
                    />
                    {error.city && <p className='text-red-500 text-xs'>{error.city}</p>}
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        placeholder="State"
                        onChange={handleChange}
                        className="w-1/3 border p-2 rounded"
                        required
                    />
                    {error.state && <p className='text-red-500 text-xs'>{error.state}</p>}
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        placeholder="PIN code"
                        onChange={handleChange}
                        className="w-1/3 border p-2 rounded"
                        required
                    />
                    {error.pincode && <p className='text-red-500 text-xs'>{error.pincode}</p>}
                </div>

                <input
                    type="number"
                    name="mobile"
                    value={formData.mobile}
                    placeholder="Phone"
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-2"
                    required
                />
                {error.mobile && <p className='text-red-500 text-xs'>{error.mobile}</p>}

                <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    placeholder="Landmark"
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-2"
                    required
                />

            </div>

            <button
                type="button"
                onClick={handleCheckout}
                className="w-full bg-pink-800 hover:bg-pink-700 text-white p-2 rounded mt-4">
                PAY NOW
            </button>
        </form>
    );
};


export default OrderForm;
