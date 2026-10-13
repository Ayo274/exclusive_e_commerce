import heroIphone from "../assets/images/hero_iphone.png";
import ps5Img from "../assets/images/ps5.png";
import speakerImg from "../assets/images/speakers.png";   

const PromoBanner = () => {
  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="bg-black text-white rounded-md flex flex-col md:flex-row items-center justify-between p-8 md:p-16 relative overflow-hidden">
        <div className="flex flex-col gap-6 z-10 max-w-lg">
          <span className="text-[#00FF66] font-semibold">Categories</span>
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight">
            Enhance Your <br /> Music Experience
          </h2>
          <div className="flex gap-4">
            {["23", "05", "59", "35"].map((val, idx) => (
              <div
                key={idx}
                className="bg-white text-black w-12 h-12 rounded-full flex flex-col items-center justify-center"
              >
                <span className="font-bold text-sm">{val}</span>
                <span className="text-[10px]">
                  {["Hours", "Days", "Minutes", "Seconds"][idx]}
                </span>
              </div>
            ))}
          </div>
          <button className="bg-[#00FF66] text-black px-8 py-3 rounded w-max font-medium hover:bg-green-500 transition-colors">
            Buy Now!
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center">
          <img
            src={speakerImg}
            alt="Speaker"
            className="object-contain h-full mix-blend-screen"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
