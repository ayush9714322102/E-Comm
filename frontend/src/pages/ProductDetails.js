import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SummaryApi from '../common/index.js'
import { FaStar, FaStarHalf } from "react-icons/fa6";
import DisplayCurrency from "../helpers/DisplayCurrency.js";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdCancel, MdReplay } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import addToCart from '../helpers/addToCart.js';
import context from '../context/index.js';
import { useContext } from 'react';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productImage: [],
    productCategory: "",
    sellingPrice: "",
  })

  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageList = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [openOffer, setOpenOffer] = useState(false)

  const { fetchUserAddToCart } = useContext(context);

    const handleaddToCart = async (e,id) => {
        await addToCart(e,id)
        fetchUserAddToCart();
    }

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true)
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: params?.id,
        }),
      })
      setLoading(false)
      const dataResponse = await response.json()
      setData(dataResponse?.product)
      setActiveImage(dataResponse?.product?.productImage[0])
    }
    fetchProductDetails()
  }, [params?.id])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  return (
    <div className='min-h-screen mt-40 container mx-auto p-4 px-20'>
      <div className='min-h-[500px] flex flex-col lg:flex-row gap-16'>
        {/* Product Image */}
        <div className='h-auto flex flex-col lg:flex-row-reverse gap-8'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
            <img src={activeImage} className='w-full object-contain' alt='Product-Image' />
          </div>
          <div>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbarnone'>
                  {productImageList.map((el, index) => (
                    <div className='h-28 w-24 bg-slate-200 rounded animate-pulse' key={index} />
                  ))}
                </div>
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbarnone'>
                  {data?.productImage?.map((imgURL, index) => (
                    <div className='h-full w-24 bg-slate-200 rounded' key={imgURL}>
                      <img
                        src={imgURL}
                        className='w-full object-contain mix-blend-multiply cursor-pointer'
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                        alt='thumbnail'
                      />
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>

        {/* Product Details */}
        <div className='flex flex-col gap-4'>
          <h2 className='leading-10 text-3xl uppercase font-sans tracking-wider'>{data?.productName}</h2>
          <div className='flex gap-1 items-center text-xl text-pink-800'>
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
          </div>
          <div className='flex gap-3 items-center text-xl lg:text-2xl my-2'>
            <p className='text-slate-800 font-semibold lg:text-3xl'>{DisplayCurrency(data?.sellingPrice)}</p>
            <p className='text-slate-400 line-through'>{DisplayCurrency(data?.productPrice)}</p>
          </div>

          <p className='text-md my-2'>
            Time to Dispatch: 20 to 25 Working Days.<br />
            For early deliveries and customization, WhatsApp us at <span className='underline font-semibold'>+917779010656</span>
          </p>

          {/* Buttons */}
          <div className='flex flex-col gap-4'>
            <button className='uppercase border-2 border-pink-800 w-full py-2 hover:bg-pink-800 hover:text-white text-black' onClick={(e) => handleaddToCart(e, data?._id)}>Add To Cart</button>
            <button className='uppercase border-2 border-pink-800 bg-pink-800 text-white w-full py-2'>Buy it Now</button>
            <button className='uppercase border-2 border-pink-800 text-black w-full py-2'>
              <Link
                target='_blank'
                to="https://api.whatsapp.com/send?phone=+917779010656&text=Hello%20Team%20Riyaasat,%20I'm%20interested%20in%20this%20product...">
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  <IoLogoWhatsapp className="text-green-600" size={22} />
                  SEE ON VIDEO CALL
                </span>
              </Link>
            </button>
          </div>

          {/* Services */}
          <div className="space-y-6 mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-sm text-gray-800">
              <div className="flex items-center gap-2">
                <MdCancel size={20} />
                <span>100% Purchase Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar size={20} />
                <span>Assured Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <MdReplay size={20} />
                <span>48 Hours Easy Return</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTruck size={20} />
                <span>Free Shipping*</span>
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">Available Offers:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                <li>Flat <span className="font-bold">20% Off</span> on Everything - No Coupon Code Needed.</li>
                <li>Free Shipping in USA on US $200 and Above.</li>
                <li>Free Shipping in India on Prepaid Orders.</li>
              </ul>
            </div>

            {/* Accordion Offers */}
            <div className="border-t pt-4">
              <button
                onClick={() => setOpenOffer(!openOffer)}
                className="w-full flex items-center justify-between font-semibold text-left text-base">
                <span className='text-lg'>Description</span>
                <FaPlus className={`transition-transform duration-300 ${openOffer ? "rotate-180" : ""}`}/>
              </button>

              <div className={`overflow-hidden transition-all duration-500 ${openOffer ? "max-h-96 mt-2" : "max-h-0"} text-sm`}>
                <p className="text-gray-700 text-lg">{data?.productDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
