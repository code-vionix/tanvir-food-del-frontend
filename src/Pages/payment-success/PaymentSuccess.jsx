import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Package } from "lucide-react";
import { getOrderById } from "@/services/order.service";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!orderId) {
      setError("Invalid Order ID");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data.order);
      } catch (err) {
        setError("Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // ⏳ Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading order details...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/" className="text-primary underline">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      {/* SUCCESS ICON */}
      <CheckCircle className="mx-auto text-green-600" size={60} />

      <h1 className="text-2xl font-semibold mt-4">Payment Successful 🎉</h1>

      <p className="text-gray-500 mt-2">
        Thank you! Your order has been placed successfully.
      </p>

      {/* ORDER INFO */}
      <div className="mt-6 border rounded-xl p-4 text-left">
        <p className="text-sm text-gray-500">Order ID</p>
        <p className="font-medium">{order?._id}</p>

        <div className="mt-3 flex justify-between text-sm">
          <span>Total Amount</span>

          <span className="font-semibold">$ {order?.totalPrice}</span>
        </div>

        <div className="mt-3 flex justify-between text-sm">
          <span>Status</span>
          <span className="text-green-600 font-medium">
            {order?.paymentStatus || "Paid"}
          </span>
        </div>
      </div>

      {/* ITEMS */}
      <div className="mt-6 border rounded-xl p-4 text-left">
        <p className="font-medium mb-3 flex items-center gap-2">
          <Package size={16} /> Order Items
        </p>

        <div className="space-y-3">
          {order?.items?.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <img
                src={item?.food?.image}
                alt={item?.food?.name}
                className="w-12 h-12 rounded object-cover"
              />

              <div className="flex-1">
                <p className="text-sm font-medium">{item?.food?.name}</p>
                <p className="text-xs text-gray-400">ID: {item?.food?._id}</p>
              </div>

              <p className="text-sm font-semibold">× {item?.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex justify-center gap-4">
        <Link
          to="/myorders"
          className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
        >
          View Orders
        </Link>

        <Link
          to="/"
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
