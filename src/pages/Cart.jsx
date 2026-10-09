import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatCurrency";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-sans">
        <h2 className="text-3xl font-bold mb-6 text-black">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8">
          Explore our store and add items to your cart to get started.
        </p>
        <Link
          to="/"
          className="bg-primaryRed text-white px-8 py-3 rounded font-medium hover:bg-red-600 transition-colors inline-block"
        >
          Return To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 font-sans max-w-[1170px]">
      <div className="text-sm text-gray-500 mb-10">
        <Link to="/" className="hover:text-black">
          Home
        </Link>{" "}
        / <span className="text-black font-semibold">Cart</span>
      </div>

      <div className="bg-white rounded-md shadow-sm border border-gray-100 p-4 mb-6 hidden md:grid grid-cols-12 text-sm font-semibold text-black">
        <div className="col-span-5">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-3 text-right">Subtotal</div>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        {cartItems.map((item) => {
          const itemPrice = item.price ?? item.basePrice ?? 0;
          const itemSubtotal = itemPrice * item.quantity;

          return (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-12 items-center bg-white shadow-sm border border-gray-100 p-4 rounded-md gap-4 text-sm"
            >
              <div className="md:col-span-5 flex items-center gap-4">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-400 hover:text-primaryRed text-xl font-bold transition-colors"
                  title="Remove product"
                >
                  &times;
                </button>
                <img
                  src={
                    item.image ||
                    (Array.isArray(item.images) ? item.images[0] : "")
                  }
                  alt={item.title}
                  className="w-12 h-12 object-contain bg-cardBg rounded p-1"
                />
                <Link
                  to={`/product/${item._id}`}
                  className="font-semibold text-black truncate hover:text-primaryRed transition-colors max-w-[200px]"
                >
                  {item.title}
                </Link>
              </div>

              <div className="md:col-span-2 text-left md:text-center font-medium text-black">
                {formatCurrency(itemPrice)}
              </div>

              <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item._id, e.target.value)}
                  className="w-16 border border-gray-300 rounded px-2 py-1 text-center font-medium focus:outline-none focus:border-black"
                />
              </div>

              <div className="md:col-span-3 text-left md:text-right font-semibold text-black">
                {formatCurrency(itemSubtotal)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mb-12">
        <Link
          to="/"
          className="border border-black/50 text-black px-8 py-3 rounded font-medium hover:bg-black hover:text-white transition-colors"
        >
          Return To Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border border-black/50 rounded px-4 py-3 text-sm flex-1 focus:outline-none focus:border-black"
          />
          <button className="bg-primaryRed text-white px-8 py-3 rounded font-medium hover:bg-red-600 transition-colors whitespace-nowrap">
            Apply Coupon
          </button>
        </div>

        <div className="lg:col-span-5 border-2 border-black rounded-md p-6 bg-white">
          <h3 className="text-lg font-bold text-black mb-6">Cart Total</h3>

          <div className="flex justify-between border-b border-gray-300 pb-4 mb-4 text-sm">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold text-black">
              {formatCurrency(totalPrice)}
            </span>
          </div>

          <div className="flex justify-between border-b border-gray-300 pb-4 mb-4 text-sm">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>

          <div className="flex justify-between text-base font-bold text-black pb-6">
            <span>Total:</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-primaryRed text-white py-3 rounded font-medium hover:bg-red-600 transition-colors text-sm"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
