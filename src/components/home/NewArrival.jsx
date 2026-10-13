import SectionHeader from "../common/SectionHeader";

const NewArrival = () => {
  return (
    <div className="container mx-auto px-4 mt-20">
      <SectionHeader
        title="New Arrival"
        subtitle="Featured"
        showTimer={false}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
        <div className="lg:col-span-2 md:col-span-1 row-span-2 bg-black rounded-md relative flex items-end p-6 overflow-hidden group">
          <img
            src="../assets/images/ps5.png"
            alt="PS5"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10 text-white">
            <h3 className="text-2xl font-bold mb-2">PlayStation 5</h3>
            <p className="text-sm mb-4 max-w-[200px]">
              Black and White version of the PS5 coming out on sale.
            </p>
            <button className="border-b border-white pb-1">Shop Now</button>
          </div>
        </div>

        <div className="lg:col-span-2 md:col-span-1 row-span-1 bg-black rounded-md relative flex items-end p-6 overflow-hidden group">
          <img
            src="../assets/images/woman_wearing_hat.png"
            alt="Women's"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10 text-white">
            <h3 className="text-xl font-bold mb-2">Women's Collections</h3>
            <p className="text-xs mb-3 max-w-[200px]">
              Featured woman collections that give you another vibe.
            </p>
            <button className="border-b border-white pb-1 text-sm">
              Shop Now
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 md:col-span-1 row-span-1 bg-black rounded-md relative flex items-end p-6 overflow-hidden group">
          <img
            src="../assets/images/speakers.png"
            alt="Speakers"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10 text-white">
            <h3 className="text-lg font-bold mb-1">Speakers</h3>
            <p className="text-xs mb-2">Amazon wireless speakers</p>
            <button className="border-b border-white pb-1 text-sm">
              Shop Now
            </button>
          </div>
        </div>

        <div className="lg:col-span-1 md:col-span-1 row-span-1 bg-black rounded-md relative flex items-end p-6 overflow-hidden group">
          <img
            src="../assets/images/perfume.png"
            alt="Perfume"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="relative z-10 text-white">
            <h3 className="text-lg font-bold mb-1">Perfume</h3>
            <p className="text-xs mb-2">GUCCI INTENSE OUD EDP</p>
            <button className="border-b border-white pb-1 text-sm">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
