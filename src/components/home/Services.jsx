import { FaTruck, FaHeadphonesAlt, FaCheckCircle } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      icon: <FaTruck />,
      title: "FREE AND FAST DELIVERY",
      desc: "Free delivery for all orders over $140",
    },
    {
      icon: <FaHeadphonesAlt />,
      title: "24/7 CUSTOMER SERVICE",
      desc: "Friendly 24/7 customer support",
    },
    {
      icon: <FaCheckCircle />,
      title: "MONEY BACK GUARANTEE",
      desc: "We return money within 30 days",
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-20 mb-20 flex flex-wrap justify-center gap-12 text-center">
      {services.map((svc, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center gap-4 max-w-[250px]"
        >
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-2xl text-black border-8 border-gray-200">
            {svc.icon}
          </div>
          <h3 className="font-bold text-lg">{svc.title}</h3>
          <p className="text-sm text-gray-500">{svc.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
