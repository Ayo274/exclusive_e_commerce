import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import { formatCurrency } from "../utils/formatCurrency";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error("Fetch order error:", err);
        setError(err.response?.data?.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center font-sans">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primaryRed border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading order details...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center font-sans">
        <h2 className="text-2xl font-bold text-primaryRed mb-4">
          {error || "Order Not Found"}
        </h2>
        <Link
          to="/"
          className="bg-primaryRed text-white px-6 py-2 rounded font-medium hover:bg-red-600 transition-colors inline-block"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 font-sans max-w-[1170px]">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-black">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/account" className="hover:text-black">
          My Account
        </Link>{" "}
        /{" "}
        <span className="text-black font-semibold">
          Order #{order._id?.substring(0, 8)}
        </span>
      </div>

      {/* Confirmation Message */}
      <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-md mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-bold text-xl text-black">
            Thank you for your order!
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Order placement complete. A confirmation email has been logged for
            your session.
          </p>
        </div>
        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
          Status:{" "}
          {order.orderStatus ||
            (order.isDelivered ? "Delivered" : "Processing")}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Items */}
        <div className="lg:col-span-8 bg-white border border-gray-100 shadow-sm rounded-md p-6">
          <h3 className="font-bold text-lg text-black mb-4 border-b border-gray-200 pb-3">
            Ordered Items
          </h3>
          <div className="flex flex-col gap-4">
            {order.orderItems?.map((item, idx) => {
              const itemPrice = item.priceAtPurchase ?? item.price ?? 0;
              const itemQty = item.quantity ?? item.qty ?? 1;

              return (
                <div
                  key={idx}
                  className="flex justify-between items-center border-b border-gray-50 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/60?text=Product"
                      }
                      alt={item.title}
                      className="w-14 h-14 object-contain bg-cardBg rounded p-1"
                    />
                    <div>
                      <h4 className="font-semibold text-black text-sm max-w-[250px] truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Qty: {itemQty}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-black text-sm">
                    {formatCurrency(itemPrice * itemQty)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Address & Payment Summary */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-md p-6">
            <h3 className="font-bold text-lg text-black mb-4 border-b border-gray-200 pb-3">
              Shipping Address
            </h3>
            <p className="font-semibold text-black text-sm">
              {order.shippingAddress?.fullName ||
                order.shippingAddress?.firstName}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {order.shippingAddress?.streetAddress}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress?.city || order.shippingAddress?.townCity}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Phone:{" "}
              {order.shippingAddress?.phone ||
                order.shippingAddress?.phoneNumber}
            </p>
          </div>

          <div className="bg-white border border-gray-100 shadow-sm rounded-md p-6">
            <h3 className="font-bold text-lg text-black mb-4 border-b border-gray-200 pb-3">
              Order Summary
            </h3>
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold text-black">
                {order.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-gray-200 pb-3">
              <span className="text-gray-600">Shipping:</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-3 text-black">
              <span>Total Paid:</span>
              <span>{formatCurrency(order.totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
