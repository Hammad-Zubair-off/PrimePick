import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36" />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["home", "collection", "about", "contact"].map((path) => (
          <NavLink 
            key={path} 
            to={path === "home" ? "/" : `/${path}`}  // ✅ "home" nu "/" bana ditta
            className="flex flex-col items-center gap-1"
          >
            <p>{path.toUpperCase()}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          alt="search"
          className="w-5 cursor-pointer"
        />
        <Link to="/login">
          <img src={assets.profile_icon} alt="profile" className="w-5 cursor-pointer" />
        </Link>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(!visible)}
        />
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`sidebar fixed top-0 right-0 bottom-0 bg-white shadow-lg transition-transform duration-300 ${
          visible ? "translate-x-0 w-64" : "translate-x-full w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <button onClick={() => setVisible(false)} className="flex items-center gap-4 p-3">
            <img src={assets.dropdown_icon} alt="close" className="h-4 rotate-180" />
            <p className="font-semibold">Back</p>
          </button>

          {["home", "collection", "about", "contact"].map((path) => (
            <NavLink
              key={path}
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border"
              to={path === "home" ? "/" : `/${path}`}  // ✅ If "home", use "/"
            >
              {path.toUpperCase()}
            </NavLink>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
