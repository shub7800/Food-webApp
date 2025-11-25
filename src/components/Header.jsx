import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const OnlineStatus = useOnlineStatus();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            className="h-25 w-auto hover:scale-105 transition-transform duration-200" 
            src={LOGO_URL} 
            alt="Logo" 
          />
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <ul className="flex items-center gap-6 text-gray-700 font-medium">
            {/* Online Status */}
            <li className="flex items-center gap-2">
              <span className="text-sm">Online Status:</span>
              <span className="text-lg">{OnlineStatus ? "✅" : "🔴"}</span>
            </li>

            {/* Navigation Links */}
            <li>
              <Link 
                to="/" 
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="hover:text-orange-500 transition-colors duration-200"
              >
                About us
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link 
                to="/cart" 
                className="hover:text-orange-500 transition-colors duration-200"
              >
                Cart
              </Link>
            </li>
          </ul>

          {/* Login/Logout Button */}
          <button
            className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 active:scale-95 transition-all duration-200 shadow-md"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;