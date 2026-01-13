import API from "./api";

// Place order
export const placeOrder = async () => {
  const res = await API.post("/orders");
  return res.data;
};

// Get user orders
export const getUserOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

// Admin: get all orders
export const getAllOrders = async () => {
  const res = await API.get("/orders/all");
  return res.data;
};

// Admin: update order status
export const updateOrderStatus = async (orderId, status) => {
  const res = await API.patch(`/orders/${orderId}/status`, { status });
  return res.data;
};
