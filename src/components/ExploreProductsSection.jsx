import { useState, useEffect } from "react";
import API from "../api/axios"; 
import ProductCard from "./common/ProductCard";

export default function ExploreProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Check server connection.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1170px] mx-auto py-20 text-center font-sans">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primaryRed border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1170px] mx-auto py-10 text-center text-primaryRed font-sans">
        {error}
      </div>
    );
  }

  return (
    <section className="max-w-[1170px] mx-auto px-4 font-sans border-b border-gray-200 pb-16">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-5 h-10 bg-primaryRed rounded-sm"></div>
        <span className="text-primaryRed font-semibold text-sm">
          Our Products
        </span>
      </div>

      <h2 className="text-3xl font-semibold text-black tracking-wide mb-12">
        Explore Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
