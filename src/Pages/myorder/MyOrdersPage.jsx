import { useEffect, useState } from "react";
import { Package, Clock, CheckCircle } from "lucide-react";
import { getUserOrders } from "@/services/order.service";

const statusConfig = {
  processing: {
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  delivered: {
    icon: CheckCircle,
    color: "text-green-600",
    bg: "bg-green-50",
  },
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders();
        setOrders(res?.orders || []);
      } catch (err) {
        console.error("Order fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500 py-20">Loading orders...</p>
      )}

      {/* EMPTY */}
      {!loading && orders.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <Package className="mx-auto mb-3" />
          <p>No orders found</p>
        </div>
      )}

      {/* ORDERS */}
      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = statusConfig[order?.status]?.icon || Clock;

          return (
            <div key={order._id} className="border rounded-xl p-4 bg-white">
              {/* ORDER HEADER */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order ID: <span className="font-medium">{order?._id}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Payment: {order.paymentStatus}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium
                  ${statusConfig[order.status]?.bg}
                  ${statusConfig[order.status]?.color}`}
                >
                  <StatusIcon size={14} />
                  {order.status}
                </div>
              </div>

              {/* ITEMS */}
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 border rounded-lg p-2"
                  >
                    {/* IMAGE */}
                    <img
                      src={item?.food?.image}
                      alt={item?.food?.name}
                      className="w-12 h-12 rounded object-cover"
                    />

                    {/* NAME + ID */}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item?.food?.name}</p>
                      <p className="text-xs text-gray-400">
                        Food ID: {item?.food?._id}
                      </p>
                    </div>

                    {/* QUANTITY */}
                    <div className="text-sm font-semibold">
                      × {item?.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* PRICE SUMMARY */}
              <div className="border-t pt-3 text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$ {order?.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>$ {order?.deliveryFee}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$ {order?.totalPrice}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
