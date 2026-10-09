import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaTimesCircle,
  FaStar,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const Header = () => {
  const { user, logout } = useAuth() || {};
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?keyword=${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  const userInitial = user?.fullName
    ? user.fullName.charAt(0).toUpperCase()
    : "U";

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="w-full">
      <div className="bg-black text-white text-sm py-3 px-4 flex justify-center items-center gap-2">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <Link to="/shop" className="underline font-semibold ml-2">
            ShopNow
          </Link>
        </p>
      </div>

      <nav className="border-b border-gray-200 py-5">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Exclusive
          </Link>

          <ul className="hidden md:flex gap-12 text-base font-medium">
            <li>
              <Link to="/" className="hover:underline underline-offset-4">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:underline underline-offset-4"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline underline-offset-4">
                About
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline underline-offset-4">
                Sign Up
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-gray-100 py-2 px-4 pr-10 rounded-md text-sm w-[240px] focus:outline-none focus:ring-1 focus:ring-gray-300"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                <FaSearch />
              </button>
            </form>

            <div className="flex items-center gap-4 text-xl">
              {/* Wishlist Icon with Dynamic Badge */}
              <Link
                to="/wishlist"
                className="relative hover:text-primaryRed transition-colors"
              >
                <FaHeart />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primaryRed text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart Icon with Dynamic Badge */}
              <Link
                to="/cart"
                className="relative hover:text-primaryRed transition-colors"
              >
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primaryRed text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Auth Section */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 hover:text-primaryRed transition-colors focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-primaryRed text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {userInitial}
                    </div>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-black/90 text-white rounded-md shadow-lg py-4 px-4 flex flex-col gap-3 text-sm z-50 backdrop-blur-md">
                      <Link
                        to="/account"
                        className="flex items-center gap-3 hover:text-gray-300 transition-colors"
                      >
                        <FaUser /> Manage My Account
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 hover:text-gray-300 transition-colors"
                      >
                        <FaShoppingCart /> My Order
                      </Link>
                      <Link
                        to="/cancellations"
                        className="flex items-center gap-3 hover:text-gray-300 transition-colors"
                      >
                        <FaTimesCircle /> My Cancellations
                      </Link>
                      <Link
                        to="/reviews"
                        className="flex items-center gap-3 hover:text-gray-300 transition-colors"
                      >
                        <FaStar /> My Reviews
                      </Link>
                      <button
                        onClick={() => {
                          if (logout) logout();
                          setDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 hover:text-gray-300 transition-colors text-left mt-2 border-t border-gray-700 pt-3"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hover:text-primaryRed transition-colors"
                >
                  <FaUser />
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
