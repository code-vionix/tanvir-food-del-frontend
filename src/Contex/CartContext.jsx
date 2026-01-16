/* eslint-disable react/prop-types */
import { addToCartAPI, getCart, removeFromCart } from "@/services/cart.service";
import { createContext, useContext, useEffect, useState } from "react";
import { useFoodItem } from "./StoreContex";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { food_list } = useFoodItem();

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

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        removeToCart,
        loading,
        loadCart,
        getTotalCartAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartItem = () => useContext(CartContext);
