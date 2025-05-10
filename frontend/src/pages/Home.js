import React from 'react'
import CatagoryList from '../components/CatagoryList'
import BanerProducts from '../components/BanerProducts';
import VerticalCardProduct from '../components/VerticalCardProduct';
import VideoGallery from './VideoSection';
import BanerSecond from '../components/BanerSecond';
import PolicySection from './PolicySection';
import LocationSection from './LocationSection';
import ContactHome from './ContactHome';
import Review from "../pages/Review";

const Home = () => {
  return (
    <div className='mt-40'>
      <BanerProducts/>
      <PolicySection/>
      <ContactHome/>
      <CatagoryList/>
      <VerticalCardProduct category={"bridal"} heading={"Top's Choli For Bridal"}/>
      <VerticalCardProduct category={"new-arrival"} heading={"New Arrival"}/>
      <VerticalCardProduct category={"best-seller"} heading={"Best-Seller"}/>
      <BanerSecond/>
      {/* <Review/> */}
      <VideoGallery/>
      <LocationSection/>
    </div>
  )
}

export default Home;