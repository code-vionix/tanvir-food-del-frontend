import API from "./api";

// Get user cart
export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

// Add / increment
export const addToCart = async (foodId) => {
  const res = await API.post("/cart/add", { foodId });
  return res.data;
};

// Remove / decrement
export const removeFromCart = async (foodId) => {
  const res = await API.post("/cart/remove", { foodId });
  return res.data;
};
