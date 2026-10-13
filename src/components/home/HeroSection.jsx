import { FaChevronRight } from "react-icons/fa";
import heroIphone from "../assets/images/hero_iphone.png";
import ps5Img from "../assets/images/ps5.png";
import speakerImg from "../assets/images/speakers.png";

const categories = [
  "Woman's Fashion",
  "Men's Fashion",
  "Electronics",
  "Home & Lifestyle",
  "Medicine",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 mt-10 flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <div className="hidden lg:block w-1/4 border-r border-gray-200 pr-4">
        <ul className="flex flex-col gap-4 text-sm font-medium">
          {categories.map((cat, index) => (
            <li
              key={index}
              className="flex justify-between items-center cursor-pointer hover:text-primaryRed group"
            >
              <span>{cat}</span>
              {["Woman's Fashion", "Men's Fashion"].includes(cat) && (
                <FaChevronRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Hero Banner */}
      <div className="w-full lg:w-3/4 bg-black text-white rounded-md flex items-center justify-between p-8 md:p-16 relative overflow-hidden">
        <div className="flex flex-col gap-6 z-10 max-w-lg">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🍎</span>
            <span className="font-medium">iPhone 14 Series</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Up to 10% <br /> off Voucher
          </h1>
          <button className="flex items-center gap-2 border-b border-white pb-1 w-max hover:text-gray-300 transition-colors">
            Shop Now &rarr;
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center">
          <img
            src={heroIphone}
            alt="Hero"
            className="object-contain h-full mix-blend-screen"
          />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <div className="w-2 h-2 rounded-full bg-primaryRed"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
