const About = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-sm text-gray-500 mb-10">
        Home / <span className="text-black">About</span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 mb-20">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-semibold mb-6">Our Story</h1>
          <p className="text-gray-600 leading-relaxed mb-4">
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sellers and 300 brands and serves 3 million customers
            across the region.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://via.placeholder.com/600x400?text=About+Us"
            alt="Our Story"
            className="w-full rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-20">
        {[
          "Sellers active our site",
          "Monthly Product Sale",
          "Customer active in our site",
          "Annual gross sale in our site",
        ].map((stat, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-md p-6 hover:bg-primaryRed hover:text-white transition-colors group"
          >
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-primaryRed transition-colors">            
            </div>
            <h3 className="text-2xl font-bold mb-2">10.5k</h3>
            <p className="text-sm">{stat}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default About;
