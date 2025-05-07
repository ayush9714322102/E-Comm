import React, { useState } from 'react'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import {toast} from "react-toastify"

const Signup = () => {
  const [showpassword, setShowPassword] = useState(false)
    const [data,setData] = useState({
      name: "",
      email: "",
      password: "",
      phone:""
    })
  
    const handleOnChange = (e) => {
      const {name , value} = e.target
  
      setData((preve) => {
        return{
          ...preve,
          [name] : value
        }
      })
    }
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const dataResponse = await fetch(SummaryApi.SignUp.url, {
          method: SummaryApi.SignUp.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
    
        const responseData = await dataResponse.json();
        console.log("API Response:", responseData);
    
        if (dataResponse.ok) {
          toast.success(responseData.message || "Signup successful!");
          // Form data clear karo
          setData({
            name: "",
            email: "",
            password: "",
            phone: ""

            
          });
          navigate("/login");
        } else {
          // Show error toast if status is not ok
          toast.error(responseData.message || responseData.error || "Signup failed");

          setData({
            name: "",
            email: "",
            password: "",
            phone: ""
          });
        }
    
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Something went wrong. Please try again later.");
      }
    };
    
    
    
    
  
    console.log("Data Login",data);

  return (
    <section id='singup' className='my-12 mt-44'>
      <div className='mx-auto container p-4'>
        <div className=' p-6 py-8 w-full max-w-md mx-auto border'>
          <p className='text-3xl text-center font-medium'>Signup</p>
          <p className='text-md text-center mt-4'>Please fill in the information below:</p>
          <form className='mt-5 ' onSubmit={handleSubmit}>
            <div className='grid'>
              <div className='bg-white border border-slate-200 p-2 my-2'>
                <input 
                  type='text' 
                  placeholder='Name' 
                  name='name' 
                  value={data.name}
                  onChange={handleOnChange} 
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div className='grid'>
              <div className='bg-white border border-slate-200 p-2 my-2'>
                <input 
                  type='email' 
                  placeholder='Email' 
                  name='email' 
                  value={data.email}
                  onChange={handleOnChange} 
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div className='grid'>
              <div className='bg-white border border-slate-200 p-2 my-2'>
                <input 
                  type='text' 
                  placeholder='Phone Number' 
                  name='phone' 
                  value={data.phone}
                  onChange={handleOnChange} 
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>
            <div>
              <div className='bg-white flex border border-slate-200 p-2 my-2 mb-3'>
                <input 
                  type={showpassword ? "text" : "password"} 
                  placeholder='Password' 
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-lg' onClick={() => setShowPassword((preve) => !preve)}>
                  <span>
                    {
                      showpassword ? (
                        <FaEyeSlash />
                      )
                        :
                        (
                          <FaEye />
                        )
                    }
                  </span>
                </div>
              </div>
              
            </div>

            <button className=' bg-pink-800 px-10 w-full mx-auto block py-2 rounded-full my-4 text-white hover:bg-pink-700'>Sign Up</button>
          </form>

          <p className='my-3 text-center'>Already have an account ?<Link to={"/login"} className='text-pink-800 hover:text-pink-700 hover:underline'>Login</Link></p>

        </div>
      </div>
    </section>
  )
}

export default Signup