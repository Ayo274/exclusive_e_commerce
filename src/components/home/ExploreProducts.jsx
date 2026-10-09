import SectionHeader from "../common/SectionHeader";
import ProductCard from "../common/ProductCard";

const ExploreProducts = ({ products = [] }) => {
  return (
    <div className="container mx-auto px-4 mt-20 font-sans">
      <SectionHeader
        title="Explore Our Products"
        subtitle="Our Products"
        showTimer={false}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <button className="bg-primaryRed text-white px-12 py-3 rounded hover:bg-red-600 transition-colors font-medium">
          View All Products
        </button>
      </div>
    </div>
  );
};

export default ExploreProducts;
