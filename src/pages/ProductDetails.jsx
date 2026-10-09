import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaTruck, FaUndo } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatCurrency } from "../utils/formatCurrency";
import RatingStars from "../components/common/RatingStars";
import ProductCard from "../components/common/ProductCard";
import api from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, wishlistItems } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Interactive options
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // 1. Fetch main product
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);

        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        // 2. Fetch related products
        const allProductsRes = await api.get("/products");
        const allList = Array.isArray(allProductsRes.data)
          ? allProductsRes.data
          : allProductsRes.data.products || [];

        const filteredRelated = allList
          .filter((item) => item._id !== id)
          .slice(0, 4);

        setRelatedProducts(filteredRelated);
        setSelectedImage(0);
        setQuantity(1);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center font-sans">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primaryRed border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading product details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-2xl font-sans">
        Product not found
      </div>
    );
  }

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  // Fallbacks for prices and images
  const productPrice = product.price ?? product.basePrice ?? 0;

  const galleryImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [
          product.image || "https://via.placeholder.com/400?text=No+Image",
          product.image || "https://via.placeholder.com/400?text=No+Image",
          product.image || "https://via.placeholder.com/400?text=No+Image",
          product.image || "https://via.placeholder.com/400?text=No+Image",
        ];

  const reviewCount =
    product.numReviews !== undefined
      ? product.numReviews
      : Array.isArray(product.reviews)
        ? product.reviews.length
        : 0;

  const ratingValue = product.rating ?? product.averageRating ?? 0;

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        price: productPrice,
        image: galleryImages[0],
        selectedColor,
        selectedSize,
      },
      quantity,
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const availableSizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : ["XS", "S", "M", "L", "XL"];

  return (
    <div className="container mx-auto px-4 py-10 font-sans max-w-[1170px]">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-10">
        <Link to="/" className="hover:text-black">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/" className="hover:text-black">
          Products
        </Link>{" "}
        / <span className="text-black font-semibold">{product.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 mb-20">
        {/* Gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 w-full lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-4 overflow-x-auto sm:overflow-visible">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setSelectedImage(idx)}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 bg-cardBg rounded flex items-center justify-center cursor-pointer border-2 transition-all flex-shrink-0 ${
                  selectedImage === idx
                    ? "border-primaryRed"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumb ${idx}`}
                  className="w-16 h-16 object-contain mix-blend-multiply"
                />
              </div>
            ))}
          </div>

          {/* Main Display */}
          <div className="flex-1 bg-cardBg rounded-md flex items-center justify-center p-8 h-[400px] sm:h-[500px]">
            <img
              src={galleryImages[selectedImage] || product.image}
              alt={product.title}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold text-black">{product.title}</h1>

          {/* Rating & Stock */}
          <div className="flex items-center gap-4 text-sm">
            <RatingStars rating={ratingValue} />
            <span className="text-gray-400 font-medium">
              ({reviewCount} Reviews)
            </span>
            <span className="text-gray-300">|</span>
            {product.countInStock > 0 ? (
              <span className="text-[#00FF66] font-medium">In Stock</span>
            ) : (
              <span className="text-primaryRed font-medium">Out of Stock</span>
            )}
          </div>

          <p className="text-2xl font-medium text-black">
            {formatCurrency(productPrice)}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed border-b border-gray-200 pb-6">
            {product.description ||
              "High quality product with excellent features. Perfect for daily use."}
          </p>

          {/* Colours Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-4 mt-2">
              <span className="font-medium text-black">Colours:</span>
              <div className="flex gap-2">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-black scale-110"
                        : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-black">Size:</span>
            <div className="flex gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-8 h-8 border rounded flex items-center justify-center text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "bg-primaryRed text-white border-primaryRed"
                      : "border-gray-300 hover:border-black text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Buy Options */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex border border-gray-300 rounded overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 hover:bg-primaryRed hover:text-white transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300 font-semibold">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((prev) =>
                    product.countInStock
                      ? Math.min(product.countInStock, prev + 1)
                      : prev + 1,
                  )
                }
                className="px-4 py-2 bg-primaryRed text-white hover:bg-red-600 transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.countInStock === 0}
              className="bg-primaryRed text-white px-10 py-2 rounded hover:bg-red-600 transition-colors disabled:opacity-50 font-medium"
            >
              Buy Now
            </button>

            <button
              onClick={() => addToWishlist(product)}
              className={`w-10 h-10 border rounded flex items-center justify-center transition-colors ${
                isWishlisted
                  ? "bg-primaryRed text-white border-primaryRed"
                  : "border-gray-300 hover:border-black text-black"
              }`}
            >
              <FaHeart />
            </button>
          </div>

          {/* Delivery Details */}
          <div className="border border-gray-300 rounded-md mt-6 divide-y divide-gray-300">
            <div className="flex items-center gap-4 p-4">
              <FaTruck className="text-2xl text-black" />
              <div>
                <p className="font-medium text-sm text-black">Free Delivery</p>
                <p className="text-xs text-gray-500 underline cursor-pointer">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <FaUndo className="text-2xl text-black" />
              <div>
                <p className="font-medium text-sm text-black">
                  Return Delivery
                </p>
                <p className="text-xs text-gray-500">
                  Free 30 Days Delivery Returns.{" "}
                  <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-5 h-10 bg-primaryRed rounded-sm"></div>
            <span className="text-primaryRed font-semibold">Related Items</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
