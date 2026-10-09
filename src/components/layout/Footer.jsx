import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-6 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Column 1 */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Exclusive</h3>
            <p className="font-medium mb-4">Subscribe</p>
            <p className="text-sm text-gray-300 mb-4">
              Get 10% off your first order
            </p>
            <div className="relative border border-white rounded-md p-2 flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-sm w-full focus:outline-none px-2"
              />
              <FaPaperPlane className="cursor-pointer" />
            </div>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="text-sm text-gray-300 flex flex-col gap-3">
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Account</h3>
            <ul className="text-sm text-gray-300 flex flex-col gap-3">
              <li>
                <a href="/account" className="hover:underline">
                  My Account
                </a>
              </li>
              <li>
                <a href="/login" className="hover:underline">
                  Login / Register
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:underline">
                  Cart
                </a>
              </li>
              <li>
                <a href="/wishlist" className="hover:underline">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:underline">
                  Shop
                </a>
              </li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Link</h3>
            <ul className="text-sm text-gray-300 flex flex-col gap-3">
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline">
                  Terms Of Use
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Column 5 */}
          <div>
            <h3 className="text-lg font-bold mb-4">Download App</h3>
            <p className="text-xs text-gray-400 mb-4">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-4 mb-6">
              <div className="w-20 h-20 bg-white"></div>
              <div className="flex flex-col gap-2">
                <div className="w-24 h-8 bg-black border border-white rounded flex items-center justify-center text-xs">
                  Google Play
                </div>
                <div className="w-24 h-8 bg-black border border-white rounded flex items-center justify-center text-xs">
                  App Store
                </div>
              </div>
            </div>
            <div className="flex gap-4 text-lg">
              <FaFacebookF className="cursor-pointer hover:text-primaryRed" />
              <FaTwitter className="cursor-pointer hover:text-primaryRed" />
              <FaInstagram className="cursor-pointer hover:text-primaryRed" />
              <FaLinkedinIn className="cursor-pointer hover:text-primaryRed" />
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
          &copy; Copyright Rimel 2022. All right reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
