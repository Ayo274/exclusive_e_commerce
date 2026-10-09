import {
  FaMobileAlt,
  FaDesktop,
  FaClock,
  FaCamera,
  FaHeadphones,
  FaGamepad,
} from "react-icons/fa";
import SectionHeader from "../common/SectionHeader";

const categories = [
  { name: "Phones", icon: <FaMobileAlt /> },
  { name: "Computers", icon: <FaDesktop /> },
  { name: "SmartWatch", icon: <FaClock /> },
  { name: "Camera", icon: <FaCamera /> },
  { name: "HeadPhones", icon: <FaHeadphones /> },
  { name: "Gaming", icon: <FaGamepad /> },
];

const BrowseByCategory = () => {
  return (
    <div className="container mx-auto px-4 mt-20">
      <SectionHeader
        title="Browse By Category"
        subtitle="Categories"
        showTimer={false}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md flex flex-col items-center justify-center py-6 gap-4 cursor-pointer hover:bg-primaryRed hover:text-white hover:border-primaryRed transition-all duration-300 group"
          >
            <div className="text-3xl group-hover:text-white transition-colors">
              {cat.icon}
            </div>
            <span className="font-medium text-sm">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseByCategory;
