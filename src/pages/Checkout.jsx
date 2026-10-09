import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    email: user?.email || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user) {
      setError("You must be logged in to place an order.");
      setLoading(false);
      navigate("/login?redirect=checkout");
      return;
    }

    try {
      const orderData = {
        orderItems: cartItems.map((item) => {
          const itemPrice = item.price ?? item.basePrice ?? 0;
          return {
            title: item.title,
            qty: item.quantity,
            image:
              item.image || (Array.isArray(item.images) ? item.images[0] : ""),
            price: itemPrice,
            product: item._id,
          };
        }),
        shippingAddress: {
          firstName: formData.firstName,
          companyName: formData.companyName,
          streetAddress: formData.streetAddress,
          apartment: formData.apartment,
          townCity: formData.townCity,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
        },
        paymentMethod,
        totalPrice,
      };

      const { data: createdOrder } = await api.post("/orders", orderData);

      clearCart();
      navigate(`/order/${createdOrder._id}`);
    } catch (err) {
      console.error("Order placement error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to place order. Please check your backend endpoint.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-sans">
        <h2 className="text-3xl font-bold mb-6 text-black">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8">
          You need items in your cart to checkout.
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
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-10">
        <Link to="/" className="hover:text-black">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/cart" className="hover:text-black">
          Cart
        </Link>{" "}
        / <span className="text-black font-semibold">Checkout</span>
      </div>

      <h1 className="text-3xl font-bold mb-10 text-black">Billing Details</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handlePlaceOrder}>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text-sm">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text-sm">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text-sm">Street Address*</label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text-sm">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text-sm">Town/City*</label>
              <input
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text-sm">Phone Number*</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text-sm">Email Address*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-100 p-3 rounded focus:outline-none focus:ring-1 focus:ring-black text-sm"
                required
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="saveInfo"
                className="accent-primaryRed"
              />
              <label
                htmlFor="saveInfo"
                className="text-sm text-gray-500 cursor-pointer"
              >
                Save this information for faster check-out next time
              </label>
            </div>
          </div>

          {/* Right Column: Order Summary & Payment */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => {
                const itemPrice = item.price ?? item.basePrice ?? 0;
                return (
                  <div
                    key={item._id}
                    className="flex justify-between items-center text-sm"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.image ||
                          (Array.isArray(item.images) ? item.images[0] : "")
                        }
                        alt={item.title}
                        className="w-12 h-12 object-contain bg-cardBg rounded p-1"
                      />
                      <span className="font-medium text-black truncate max-w-[200px]">
                        {item.title}
                      </span>
                    </div>
                    <span className="font-semibold text-black">
                      {formatCurrency(itemPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between border-b border-gray-300 pb-4 mt-2 text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-semibold text-black">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-4 text-sm">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between pb-4 text-base font-bold text-black">
              <span>Total:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>

            {/* Payment Selection */}
            <div className="flex flex-col gap-4 mt-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="Bank"
                    checked={paymentMethod === "Bank"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-black"
                  />
                  <span className="text-sm font-medium">Bank</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on delivery"
                  checked={paymentMethod === "Cash on delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-black"
                />
                <span className="text-sm font-medium">Cash on delivery</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`px-10 py-4 rounded font-medium text-sm transition-colors mt-4 w-full sm:w-max ${
                loading
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-primaryRed hover:bg-red-600 text-white"
              }`}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
