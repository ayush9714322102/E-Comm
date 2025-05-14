import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import Context from "./context/index.js";
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import ScrollToTop from './components/TopScroll.js';

const App = () => {
  const dispatch = useDispatch();
  const [CartProductCount, setCartProductCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0)

  const fetchUserDetails = async (dispatch) => {
    try {
      const dataResponse = await fetch(SummaryApi.Current_user.url, {
        method: SummaryApi.Current_user.method,
        credentials: "include",
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      } else {
        console.warn("User fetch unsuccessful", dataApi.message);
      }

    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const fetchUserAddToCart = async () => {
    try {
      const res = await fetch(SummaryApi.countAddToCart.url, {
        method: SummaryApi.countAddToCart.method,
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        // Update cart product count
        setCartProductCount(data?.data?.count || 0);
      } else {
        console.warn("Cart fetch unsuccessful", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch cart details", error);
    }
  };

  const fetchWishlist = async () => {
    const response = await fetch(SummaryApi.getWishlistCount.url, {
      method: SummaryApi.getWishlistCount.method,
      credentials: "include"
    });

    const dataApi = await response.json();

    setWishlistCount(dataApi?.data?.count || 0)
    console.log("Wishlist Count :- ", dataApi);

  }

  useEffect(() => {
    fetchUserDetails(dispatch);
    fetchUserAddToCart(dispatch);
    fetchWishlist()
  }, [dispatch]);

  return (
    <Context.Provider value={{
      fetchUserDetails: () => fetchUserDetails(dispatch),
      fetchUserAddToCart: () => fetchUserAddToCart(dispatch),
      CartProductCount, setCartProductCount,
      wishlistCount,
      fetchWishlist,
      setWishlistCount
    }}>
      <ScrollToTop />
      <ToastContainer position='top-center' />
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow  ">
          <Outlet />
        </main>

        <Footer />
      </div>
    </Context.Provider>
  );
}

export default App;
