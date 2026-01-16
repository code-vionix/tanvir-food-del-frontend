/* eslint-disable react/prop-types */
import { addToCartAPI, getCart, removeFromCart } from "@/services/cart.service";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await getCart();
      const items = res.cart;
      const obj = {};
      items.forEach((item) => {
        obj[item.food._id.toString()] = item.quantity; // ✅ convert ObjectId to string
      });

      setCartItem(obj);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ PERFECT OPTIMISTIC ADD
  const addToCart = async (id) => {
    setCartItem((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    try {
      await addToCartAPI(id);
      // ❌ NO loadCart here
    } catch (err) {
      console.log(err);

      // rollback if failed
      setCartItem((prev) => ({
        ...prev,
        [id]: prev[id] - 1,
      }));
    }
  };

  // ✅ PERFECT OPTIMISTIC REMOVE
  const removeToCart = async (id) => {
    setCartItem((prev) => {
      const qty = prev[id] - 1;

      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }

      return {
        ...prev,
        [id]: qty,
      };
    });

    try {
      await removeFromCart(id);
    } catch (err) {
      await loadCart(); // শুধু error হলে reload
      console.log(err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItem, addToCart, removeToCart, loading, loadCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartItem = () => useContext(CartContext);
