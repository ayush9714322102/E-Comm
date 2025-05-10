import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="">
      <footer className="bg-gray-100 text-gray-800 p-8 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div>
            <h2 className="font-bold text-lg mb-2">ABOUT</h2>
            <p className="text-sm">
              The premier destination for luxury ethnic wear collections for men & women inspired by our culture. Emphasizing harmonious blends of intricate details, that make you stand out on all your special occasions.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">MEN'S WEAR</h2>
            <ul className="space-y-1">
              <li><Link to="mens-wear/sherwani" className="hover:text-gray-500">Sherwani</Link></li>
              <li><Link to="mens-wear/indo-western" className="hover:text-gray-500">Indo Western</Link></li>
              <li><Link to="mens-wear/tuxedo-set" className="hover:text-gray-500">Tuxedo Set</Link></li>
              <li><Link to="mens-wear/koti-set" className="hover:text-gray-500">Bundi Set</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">WOMENSWEAR</h2>
            <ul className="space-y-1">
              <li><Link to="womens-wear/bridal-lehenga" className="hover:text-gray-500">Bridal Regalia</Link></li>
              <li><Link to="womens-wear/salwar-suits" className="hover:text-gray-500">Salwar Suit</Link></li>
              <li><Link to="womens-wear/gowns" className="hover:text-gray-500">Gown</Link></li>
              <li><Link to="womens-wear/sarees" className="hover:text-gray-500">Sarees</Link></li>
              <li><Link to="womens-wear/lehenga-cholis" className="hover:text-gray-500">Lehenga Cholis</Link></li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-20">
            <div>
              <h2 className="font-bold text-lg mb-2">POLICIES</h2>
              <ul className="space-y-1">
                <li><Link to="/policy" className="hover:text-gray-500">Privacy Policy</Link></li>
                <li><Link to="/return" className="hover:text-gray-500">Return & Refund Policy</Link></li>
                <li><Link to="#" className="hover:text-gray-500">Terms & Conditions</Link></li>
                <li><Link to="#" className="hover:text-gray-500">Cancellation & Refunds</Link></li>
                <li><Link to="#" className="hover:text-gray-500">Returns And Exchanges</Link></li>
                <li><Link to="#" className="hover:text-gray-500">Shipping And Delivery</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2">MORE LINKS</h2>
              <ul className="space-y-1">
                <li><Link to="#" className="hover:text-gray-500">About Us</Link></li>
                <li><Link to="#" className="hover:text-gray-500">Contact Us</Link></li>
                <li><Link to="#" className="hover:text-gray-500">Blog</Link></li>
                <li><Link to="#" className="hover:text-gray-500">Testimonials</Link></li>
                <li><Link to="#" className="hover:text-gray-500">Store Locator</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/3">
            <h2 className="font-bold text-lg mb-2">SIGN UP FOR UPDATES</h2>
            <div className="flex">
              <input type="email" placeholder="E-mail" className="p-2 border border-gray-300 rounded-l w-full" />
              <button className="bg-pink-800 text-white px-4 py-2 rounded-r">SUBSCRIBE</button>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 border p-2 rounded">
              <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/30px-Flag_of_India.svg.png" alt="India Flag" />
              <span>INR</span>
            </div>
            <div className="flex space-x-4">
              <Link to="#"><img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook Logo" className="w-6 h-6" /></Link>
              <Link to="#"><img src="https://cdn-icons-png.flaticon.com/24/733/733558.png" alt="logo" className="w-6" /></Link>
              <Link to="#"><img src="https://cdn-icons-png.flaticon.com/24/733/733646.png" alt="loo" className="w-6" /></Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Footer;