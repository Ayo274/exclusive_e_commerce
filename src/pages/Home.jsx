import { useState, useEffect } from "react";
import api from "../services/api";
import HeroSection from "../components/home/HeroSection";
import FlashSales from "../components/home/FlashSales";
import BrowseByCategory from "../components/home/BrowseByCategory";
import BestSelling from "../components/home/BestSelling";
import PromoBanner from "../components/home/PromoBanner";
import ExploreProducts from "../components/home/ExploreProducts";
import NewArrival from "../components/home/NewArrival";
import Services from "../components/home/Services";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/products");
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list);
      } catch (error) {
        console.error("Error fetching home products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-sans text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="pb-10 font-sans">
      <HeroSection />
      {/* Items 0 to 3 -> Flash Sales */}
      <FlashSales products={products.slice(0, 4)} />
      <BrowseByCategory />
      {/* Items 4 to 7 -> Best Selling */}
      <BestSelling products={products.slice(4, 8)} />
      <PromoBanner />
      {/* All Items -> Explore Products */}
      <ExploreProducts products={products} />
      <NewArrival />
      <Services />
    </div>
  );
};

export default Home;
