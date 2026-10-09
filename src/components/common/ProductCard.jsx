import { FaHeart, FaEye } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatCurrency";
import RatingStars from "./RatingStars";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, wishlistItems } = useWishlist();

  if (!product) return null;

  const price = product.price ?? product.basePrice ?? 0;
  const originalPrice = product.originalPrice ?? product.basePrice;

  const imageUrl =
    product.image ||
    (Array.isArray(product.images) && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/190x180?text=No+Image");

  const ratingValue = product.rating ?? product.averageRating ?? 0;
  const reviewCount =
    product.numReviews ??
    (Array.isArray(product.reviews)
      ? product.reviews.length
      : product.reviews || 0);

  const isWishlisted = wishlistItems?.some((item) => item._id === product._id);

  return (
    <div className="group relative flex flex-col w-full max-w-[270px] mx-auto cursor-pointer font-sans">
      <div className="relative bg-cardBg h-[250px] flex items-center justify-center rounded-md overflow-hidden transition-all duration-300">
  
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {(product.discountPercentage > 0 || product.discount > 0) && (
            <span className="bg-primaryRed text-white text-xs px-2 py-1 rounded font-semibold">
              -{product.discountPercentage || product.discount}%
            </span>
          )}
          {(product.isNew || product.isNewProduct) && (
            <span className="bg-[#00FF66] text-black text-xs px-2 py-1 rounded font-semibold">
              NEW
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(product);
            }}
            className={`p-2 rounded-full transition-colors ${
              isWishlisted
                ? "bg-primaryRed text-white"
                : "bg-white hover:bg-primaryRed hover:text-white"
            }`}
          >
            <FaHeart />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-primaryRed hover:text-white transition-colors">
            <FaEye />
          </button>
        </div>

        <Link
          to={`/product/${product._id}`}
          className="w-full h-full flex items-center justify-center p-4"
        >
          <img
            src={imageUrl}
            alt={product.title}
            className="w-[190px] h-[180px] object-contain mix-blend-multiply"
          />
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ ...product, price, image: imageUrl });
          }}
          className="absolute bottom-0 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium"
        >
          Add To Cart
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-base text-black truncate hover:text-primaryRed transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="flex gap-3 items-center">
          <span className="text-primaryRed font-semibold text-base">
            {formatCurrency(price)}
          </span>
          {originalPrice > price && (
            <span className="text-gray-400 line-through text-sm">
              {formatCurrency(originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <RatingStars rating={ratingValue} />
          <span className="text-gray-400 text-sm font-semibold">
            ({reviewCount})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
