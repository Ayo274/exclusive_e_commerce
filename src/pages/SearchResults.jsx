import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/common/ProductCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products?keyword=${keyword}`);
        const productList = Array.isArray(data) ? data : data.products || [];
        setProducts(productList);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (keyword) fetchResults();
  }, [keyword]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-8">
        Search Results for: <span className="text-primaryRed">"{keyword}"</span>
      </h2>

      {loading ? (
        <div className="text-center py-20">Searching...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchResults;
