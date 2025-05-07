import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/LOGO.avif";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SummaryApi from "../common/index.js";
import ROLE from "../common/role.js";
import { setUserDetails } from "../store/userSlice.js";
import { FaSearch } from "react-icons/fa";
import Context from "../context/index.js";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const context = useContext(Context);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.Logout_user.url, {
      method: SummaryApi.Logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const [isWomenDropdownOpen, setWomenDropdownOpen] = useState(false);
  const [ismenDropdownOpen, setmenDropdownOpen] = useState(false);
  const [isshopDropdownOpen, setshopDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setWomenDropdownOpen(true);
    setmenDropdownOpen(false);
  };

  const handleMouseEnter1 = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setmenDropdownOpen(true);
    setWomenDropdownOpen(false);
  };

  const handleMouseEnter2 = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setshopDropdownOpen(true);
    setmenDropdownOpen(false);
    setWomenDropdownOpen(false);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setWomenDropdownOpen(false);
    }, 300);
  };

  const handleMouseLeave1 = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setmenDropdownOpen(false);
    }, 300);
  };

  const handleMouseLeave2 = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setshopDropdownOpen(false);
    }, 300);
  };

  const [searchInput, setSearchInput] = useState('');
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const trimmed = searchInput.trim();
      if (trimmed) {
        navigate(`/search?q=${trimmed}`);
        setSearchInput('');
      }
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 border-b border-gray-300">
      {/* Top Section */}
      <div className="container mx-auto flex items-center justify-between md:px-10 py-4 relative">
        {/* Logo Center */}
        <div className="flex justify-center w-full">
          <Link to="/">
            <img src={logo} alt="Riyaasat Logo" className="w-52" />
          </Link>
        </div>

        {/* Right Icons (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-4 text-lg text-gray-700 absolute right-0 pr-5">
          <div className="relative flex justify-center">
            <div className="cursor-pointer flex justify-center relative" onClick={() => setMenuDisplay(preve => !preve)}>
              <Link to="admin-panel" className="text-2xl"><FaUser className="hover:text-pink-800 transition" /></Link>
            </div>
            {
              menuDisplay && (
                <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded hidden group-hover:block">
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-product"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2 text-md" onClick={() => setMenuDisplay((preve) => !preve)}>Admin Panel</Link>
                      )
                    }
                  </nav>
                </div>
              )
            }
          </div>

          {/* Search Icon */}
          <FaSearch
            className="text-2xl cursor-pointer block hover:text-pink-800 transition"
            onClick={() => setIsSearchOpen(true)}
          />


          <Link to="/cart" className="relative text-2xl">
            <FaShoppingCart className="hover:text-pink-800 transition" />
            <span className="bg-pink-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">{context.CartProductCount}</span>
          </Link>

          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className="bg-pink-800 px-4 p-2 rounded-full text-white text-sm font-bold">Logout</button>
              ) : (
                <Link to="/login" className="bg-pink-800 px-4 p-2 rounded-full text-white text-sm font-bold">Login</Link>
              )
            }
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 pr-5" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Icons (Always Visible Below Logo) */}
      <div className="md:hidden bg-white border-t px-6 py-3 flex justify-around items-center">
        <Link to="/cart" className="relative text-2xl">
          <FaShoppingCart className="hover:text-pink-800 transition" />
          <span className="bg-pink-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2">{context.CartProductCount}</span>
        </Link>

        {/* Search Icon */}
        <FaSearch
          className="text-2xl cursor-pointer block hover:text-pink-800 transition"
          onClick={() => setIsSearchOpen(true)}
        />

        {user?._id ? (
          <button onClick={handleLogout} className="bg-pink-800 px-3 py-1 rounded-full text-white text-sm font-bold">Logout</button>
        ) : (
          <Link to="/login" className="bg-pink-800 px-3 py-1 rounded-full text-white text-sm font-bold">Login</Link>
        )}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 justify-center space-x-7 font-semibold text-sm py-4 pb-5 border-t-2">
        <Link to="/new-arrivals" className="text-gray-800 hover:text-pink-800 transition">NEW ARRIVAL</Link>
        <Link to="/best-sellers" className="text-gray-800 hover:text-pink-800 transition">BEST SELLERS</Link>

        <div className="relative group z-30" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span className="cursor-pointer text-gray-800 hover:text-pink-800 transition">WOMEN'S WEAR</span>
          {isWomenDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-md">
              <Link to="/womens-wear/sarees" className="block px-4 py-2 hover:bg-pink-100">Sarees</Link>
              <Link to="/womens-wear/salwar-suits" className="block px-4 py-2 hover:bg-pink-100">Salwar Suits</Link>
              <Link to="/womens-wear/lehenga-cholis" className="block px-4 py-2 hover:bg-pink-100">Lehenga Cholis</Link>
              <Link to="/womens-wear/gowns" className="block px-4 py-2 hover:bg-pink-100">Gown</Link>
              <Link to="/womens-wear/bridal-lehenga" className="block px-4 py-2 hover:bg-pink-100">Bridal Lehenga</Link>
            </div>
          )}
        </div>

        <div className="relative group z-30" onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave1}>
          <span className="cursor-pointer text-gray-800 hover:text-pink-800 transition">MEN'S WEAR</span>
          {ismenDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-md">
              <Link to="/mens-wear/kurta-set" className="block px-4 py-2 hover:bg-pink-100">Kurta Set</Link>
              <Link to="/mens-wear/koti-set" className="block px-4 py-2 hover:bg-pink-100">Koti Set</Link>
              <Link to="/mens-wear/sherwani" className="block px-4 py-2 hover:bg-pink-100">Sherwani</Link>
              <Link to="/mens-wear/tuxedo-set" className="block px-4 py-2 hover:bg-pink-100">Tuxedo Set</Link>
              <Link to="/mens-wear/indo-western" className="block px-4 py-2 hover:bg-pink-100">Indo Western</Link>
              <Link to="/mens-wear/groom-wear" className="block px-4 py-2 hover:bg-pink-100">Groom Wear</Link>
            </div>
          )}
        </div>

        <Link to="/wedding-guest-edit" className="text-gray-800 hover:text-pink-800 transition">WEDDING GUEST EDIT</Link>

        <div className="relative group z-30" onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>
          <span className="cursor-pointer text-gray-800 hover:text-pink-800 transition">SHOP BY OCCASION</span>
          {isshopDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg border rounded-md">
              <Link to="/haldi" className="block px-4 py-2 hover:bg-pink-100">Haldi Hues</Link>
              <Link to="/mehendi" className="block px-4 py-2 hover:bg-pink-100">Mehendi Mood</Link>
              <Link to="/reception" className="block px-4 py-2 hover:bg-pink-100">Reception Ready</Link>
            </div>
          )}
        </div>

        <Link to="/shop-by-collection" className="text-gray-800 hover:text-pink-800 transition">SHOP BY COLLECTION</Link>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <Link to="/new-arrivals" className="block px-4 py-2 text-gray-800 hover:bg-pink-100">NEW ARRIVAL</Link>
          <Link to="/best-sellers" className="block px-4 py-2 text-gray-800 hover:bg-pink-100">BEST SELLERS</Link>
          <div className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-pink-100" onClick={() => setWomenDropdownOpen(!isWomenDropdownOpen)}>
            WOMEN'S WEAR {isWomenDropdownOpen ? "▲" : "▼"}
          </div>
          {isWomenDropdownOpen && (
            <div className="pl-6">
              <Link to="/womens-wear/sarees" className="block px-4 py-2 hover:bg-pink-100">Sarees</Link>
              <Link to="/womens-wear/salwar-suits" className="block px-4 py-2 hover:bg-pink-100">Salwar Suits</Link>
              <Link to="/womens-wear/lehenga-cholis" className="block px-4 py-2 hover:bg-pink-100">Lehenga Cholis</Link>
              <Link to="/womens-wear/gowns" className="block px-4 py-2 hover:bg-pink-100">Gown</Link>
              <Link to="/womens-wear/bridal-lehenga" className="block px-4 py-2 hover:bg-pink-100">Bridal Lehenga</Link>
            </div>
          )}
          <div className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-pink-100" onClick={() => setmenDropdownOpen(!ismenDropdownOpen)}>
            MEN'S WEAR {ismenDropdownOpen ? "▲" : "▼"}
          </div>
          {ismenDropdownOpen && (
            <div className="pl-6">
              <Link to="/mens-wear/kurta-set" className="block px-4 py-2 hover:bg-pink-100">Kurta Set</Link>
              <Link to="/mens-wear/koti-set" className="block px-4 py-2 hover:bg-pink-100">Koti Set</Link>
              <Link to="/mens-wear/sherwani" className="block px-4 py-2 hover:bg-pink-100">Sherwani</Link>
              <Link to="/mens-wear/tuxedo-set" className="block px-4 py-2 hover:bg-pink-100">Tuxedo Set</Link>
              <Link to="/mens-wear/indo-western" className="block px-4 py-2 hover:bg-pink-100">Indo Western</Link>
              <Link to="/mens-wear/groom-wear" className="block px-4 py-2 hover:bg-pink-100">Groom Wear</Link>
            </div>
          )}
          <Link to="/wedding-guest-edit" className="block px-4 py-2 text-gray-800 hover:text-pink-800 transition">WEDDING GUEST EDIT</Link>

          <div className="px-4 py-2 text-gray-800 cursor-pointer hover:bg-pink-100" onClick={() => setshopDropdownOpen(!isshopDropdownOpen)}>SHOP BY OCCASION{isshopDropdownOpen ? "▲" : "▼"}</div>
          {isshopDropdownOpen && (
            <div className="pl-6">
              <Link to="/haldi" className="block px-4 py-2 hover:bg-pink-100">Haldi Hues</Link>
              <Link to="/mehendi" className="block px-4 py-2 hover:bg-pink-100">Mehendi Mood</Link>
              <Link to="/reception" className="block px-4 py-2 hover:bg-pink-100">Reception Ready</Link>
            </div>
          )}

          <Link to="/shop-by-collection" className="block px-4 py-2 text-gray-800 hover:text-pink-800 transition">SHOP BY COLLECTION</Link>
        </div>
      )}

      {isSearchOpen && (
        <div className="">
          <div className="flex gap-3 relative mx-9 p-3 border-t-2 border-gray-300">
            <FaSearch className="text-lg text-slate-600 mt-1"/>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search For..."
              className="w-full outline-none text-md uppercase"
            />
            <FaTimes
              className="text-xl absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        </div>
      )}

    </nav>
  );
};

export default Header;
