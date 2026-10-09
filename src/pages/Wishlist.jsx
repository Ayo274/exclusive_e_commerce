// src/pages/Wishlist.jsx
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/common/ProductCard";
import { mockProducts } from "../data/mockData"; 

const Wishlist = () => {
  const { wishlistItems, addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  const moveAllToBag = () => {
    wishlistItems.forEach((item) => {
      addToCart(item);
      addToWishlist(item); 
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-medium">
          Wishlist ({wishlistItems.length})
        </h2>
        {wishlistItems.length > 0 && (
          <button
            onClick={moveAllToBag}
            className="border border-gray-400 px-6 py-3 rounded hover:bg-gray-100 transition-colors"
          >
            Move All To Bag
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-20">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-5 h-10 bg-primaryRed rounded-sm"></div>
            <span className="text-primaryRed font-semibold">Just For You</span>
          </div>
          <button className="border border-gray-400 px-6 py-3 rounded hover:bg-gray-100 transition-colors">
            See All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
