import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import context from '../context/index.js';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(context);
  fetchUserDetails();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(SummaryApi.SingIn.url, {
        method: SummaryApi.SingIn.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Login API Response:", result);

      if (result.success) {
        toast.success(result.message || "Login successful");
        navigate("/");
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);           
      toast.error("If you haven't signed up, please sign up. ");
    }
  };

  return (
    <section id='login' className='my-12 mt-44'>
      <div className='mx-auto container p-4'>
        <div className='p-6 py-8 w-full max-w-md mx-auto border'>
          <p className='text-3xl text-center font-medium'>Login</p>
          <p className='text-md text-center mt-4'>Enter your email and password to login:</p>
          <form className='mt-5' onSubmit={onSubmit}>
            <div className='grid'>
              <div className='bg-white border border-slate-200 p-2 my-2'>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>
            <div>
              <div className='bg-white flex border border-slate-200 p-2 my-2'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  name='password'
                  value={data.password}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
                <div
                  className='cursor-pointer text-lg'
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <Link
                to={'/forgot-password'}
                className='block w-fit ml-auto hover:underline hover:text-pink-800'
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type='submit'
              className='bg-pink-800 px-10 w-full mx-auto block py-2 rounded-full my-4 text-white hover:bg-pink-700'
            >
              Login
            </button>
          </form>
          <p className='my-3 text-center'>
            Don&apos;t have an account?{' '}
            <Link
              to='/sign-up'
              className='text-pink-800 hover:text-pink-700 hover:underline'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
