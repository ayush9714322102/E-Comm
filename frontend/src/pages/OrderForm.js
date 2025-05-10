import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await axios.post('http://localhost:3000/order/create', formData);
            alert('Order Saved Successfully');
        } catch (err) {
            alert('Error saving order');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6 mt-40">
            <div>
                <h2 className="text-lg font-semibold mb-2">Contact</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-2"
                    required
                />
                <label className="flex items-center space-x-2 text-sm">
                    <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleChange}
                        className="accent-pink-600"
                    />
                    <span>Email me with news and offers</span>
                </label>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">Delivery</h2>

                <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-2"
                >
                    <option value="India">India</option>
                </select>

                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        onChange={handleChange}
                        className="w-1/2 border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        onChange={handleChange}
                        className="w-1/2 border p-2 rounded"
                        required
                    />
                </div>

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-2"
                    required
                />

                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                        className="w-1/3 border p-2 rounded"
                        required
                    />
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-1/3 border p-2 rounded">
                        <option value="Gujarat">Gujarat</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                    </select>
                    <input
                        type="text"
                        name="pincode"
                        placeholder="PIN code"
                        onChange={handleChange}
                        className="w-1/3 border p-2 rounded"
                        required
                    />
                </div>

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    className="w-full border p-2 rounded mb-2"
                    required
                />

                <label className="flex items-center space-x-2 text-sm">
                    <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                        className="accent-pink-600"
                    />
                    <span>Save this information for next time</span>
                </label>
            </div>

            <button
                type="submit"
                className="w-full bg-pink-800 hover:bg-pink-700 text-white p-2 rounded mt-4">
                PAYMENT NOW
            </button>
        </form>
    );
};


export default OrderForm;
