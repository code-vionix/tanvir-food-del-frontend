import { getAllOrders, updateOrderStatus } from "@/services/order.service";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res?.orders || []);
      } catch (err) {
        console.error("Order fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // status change handler
  const handleStatusChange = async (orderId, newStatus) => {
    console.log(orderId, newStatus);

    try {
      // call API
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.success) {
        // update UI
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
      }
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="flex flex-col gap-4 p-5">
      <p className="font-bold text-gray-600 text-xl">Orders Page</p>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-orange-200 p-5 my-2 text-sm text-gray-700 bg-white shadow-sm rounded"
          >
            {/* Customer Info */}
            <div className="flex items-center gap-4 mb-4">
              <Box
                size={40}
                className="text-orange-500 bg-orange-50 p-1 rounded shadow-inner"
              />
              <div>
                <p className="font-semibold">
                  {order.user?.fullName || "Unknown User"} ({order.user?.email})
                </p>
                <div className="text-xs text-gray-500 mt-1">
                  <p>
                    {order.deliveryInfo?.street}, {order.deliveryInfo?.city},{" "}
                    {order.deliveryInfo?.state}, {order.deliveryInfo?.country} -{" "}
                    {order.deliveryInfo?.zipCode}
                  </p>
                  <p>{order.deliveryInfo?.phone}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 mb-2 border-b pb-2"
                >
                  <img
                    src={item.food?.image}
                    alt={item.food?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.food?.name}</p>
                    <p className="text-xs text-gray-500">
                      Price: ${item.food?.price} x {item.quantity} = $
                      {item.food?.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Status */}
            <div className="flex justify-between items-center mt-2">
              <p className="font-bold text-black">Total: ${order.totalPrice}</p>
              <select
                className="bg-[#fff0ed] border border-orange-300 p-2 outline-none rounded-sm font-medium"
                value={order.status.toLowerCase()}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="processing">Processing</option>
                <option value="out-for-delivery">Out for delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
