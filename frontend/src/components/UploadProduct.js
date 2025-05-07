import React from 'react'
import { CgClose } from "react-icons/cg";
import { useState } from 'react'
import productCatagory from "../helpers/productCatagory.js";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage.js';
import DisplayImage from './DisplayImage.js';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common/index.js';
import { toast } from 'react-toastify';

const UploadProduct = ({
    onClose,
    fetchdata,
}) => {
    const [data, setData] = useState({
        productName: "",
        productDescription: "",
        productPrice: "",
        productImage: [],
        productCategory: "",
        sellingPrice: "",
    })
    const [openFullImage, setOpenFullImage] = useState(false)
    const [fullImage, setFullImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleUploadProduct = async (e) => {
        const files = Array.from(e.target.files)

        const uplodedImage = await Promise.all(
            files.map(async (file) => {
                const uploadImageCloudinary = await uploadImage(file)
                return uploadImageCloudinary.url;
            }
        ))
        setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, ...uplodedImage],
        }))
    }

    const handleDeleteImage = async (e) => {
        const newImage = [...data.productImage]
        newImage.splice(e, 1)
        setData((prev) => ({
            ...prev,
            productImage: [...newImage],
        }))
    }

    //Handle Upload Product

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(SummaryApi.uploadproduct.url, {
            method: SummaryApi.uploadproduct.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const result = await response.json();
        if(result.success) {
            toast.success(result?.message)
            onClose()
            fetchdata()
        }
        
        if(result.error) {
            toast.error(result?.message)
        }
    }

        return (
            <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-slate-200 bg-opacity-60 flex items-center justify-center'>
                <div className='mt-40 bg-white text-black p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden overflow-y-scroll'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-lg'>Upload Product</h2>
                        <div className='w-fit ml-auto text-2xl hover:text-pink-800 cursor-pointer' onClick={onClose}>
                            <CgClose />
                        </div>
                    </div>

                    <form className='grid p-4 gap-2' onSubmit={handleSubmit}>
                        <label htmlFor='productName'>Product Name:</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            placeholder='Enter Product Name'
                            value={data.productName}
                            onChange={handleOnChange}
                            className='p-2 bg-pink-100 border rounded'
                            required
                        />

                        <label htmlFor='productCategory' className='mt-3'>Category:</label>
                        <select required value={data.productCategory} name="productCategory" id="productCategory" className='p-2 bg-pink-100 border rounded text-black' onChange={handleOnChange}>
                            <option value="">Select Category</option>
                            {
                                productCatagory.map((el, index) => (
                                    <option value={el.value} key={el.value + index}>{el.name}</option>
                                ))
                            }
                        </select>

                        <label htmlFor='productImage' className='mt-3'>Product Image:</label>
                        <label htmlFor='uploadImageInput'>
                            <div className='p-2 bg-pink-100 border rounded w-full h-32 flex items-center justify-center cursor-pointer'>
                                <div className='flex flex-col items-center justify-center gap-2'>
                                    <span className='text-3xl'><FaCloudUploadAlt /></span>
                                    <p className='text-md'>Upload Product Image</p>
                                    <input
                                        type='file'
                                        multiple
                                        id='uploadImageInput'
                                        name='uploadImageInput'
                                        className='hidden'
                                        onChange={handleUploadProduct}
                                    />
                                </div>
                            </div>
                        </label>
                        <div>
                            {
                                data.productImage[0] ? (
                                    <div className='flex items-center gap-2'>
                                        {
                                            data.productImage.map((el, index) => {
                                                return (
                                                    <div className='relative group' key={el}>
                                                        <img
                                                            src={el}
                                                            alt=''
                                                            width={90}
                                                            className='bg-pink-100 border'
                                                            onClick={() => {
                                                                setOpenFullImage(true)
                                                                setFullImage(el)
                                                            }}
                                                        />
                                                        <div className='absolute bottom-0 right-0 p-1 m-1 text-pink-800 bg-white rounded-full cursor-pointer group-hover:block hidden' onClick={() => handleDeleteImage(index)}>
                                                            <MdDelete />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                    <p className='text-red-500 text-xs'>Please Upload Image</p>
                                )
                            }
                        </div>

                        <label htmlFor='productPrice' className='mt-3'>Product Price:</label>
                        <input
                            type="number"
                            id="productPrice"
                            name="productPrice"
                            placeholder='Enter Product Price'
                            value={data.productPrice}
                            onChange={handleOnChange}
                            className='p-2 bg-pink-100 border rounded'
                            required
                        />

                        <label htmlFor='sellingPrice' className='mt-3'>Selling Price:</label>
                        <input
                            type="number"
                            id="sellingPrice"
                            name="sellingPrice"
                            placeholder='Enter Selling Price'
                            value={data.sellingPrice}
                            onChange={handleOnChange}
                            className='p-2 bg-pink-100 border rounded'
                            required
                        />

                        <label htmlFor='productDescription' className='mt-3'>Product Description:</label>
                        <textarea
                            id="productDescription"
                            name="productDescription"
                            placeholder='Enter Product Description'
                            value={data.productDescription}
                            onChange={handleOnChange}
                            className='p-2 h-28 resize-none bg-pink-100 border rounded'
                            required
                        />


                        <button className='px-3 py-2 bg-pink-800 text-white mb-10 mt-5'>Upload Product</button>
                    </form>

                </div>

                {/*Display Image Full Screen*/}
                {
                    openFullImage && (
                        <DisplayImage onClose={() => setOpenFullImage(false)} imgurl={fullImage} />
                    )
                }
            </div>
        )
}

export default UploadProduct;