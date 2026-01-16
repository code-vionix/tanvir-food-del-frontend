import { createContext, useContext, useEffect, useState } from "react";
import { getAllFoods } from "@/services/food.service";

export const StoreContex = createContext(null);

// eslint-disable-next-line react/prop-types
const StoreContexProvider = ({ children }) => {
  const [allFoods, setAllFoods] = useState([]);
  // const [loading,setLoading] = useState(true)

  const fetchFoods = async () => {
    try {
      const food = await getAllFoods();
      setAllFoods(food.foods || []);
      // setLoading(false);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const getTotalCartAmount = () => {
    const totalAmount = 0;
    return totalAmount;
  };
  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItem) {
  //     if (cartItem[item] > 0) {
  //       let itemInfo = food_list.find((product) => product._id === item);
  //       totalAmount += itemInfo.price * cartItem[item];
  //     }
  //   }
  //   return totalAmount;
  // };

  const contexValue = {
    food_list: allFoods,
    getTotalCartAmount,
  };
  return (
    <StoreContex.Provider value={contexValue}>{children}</StoreContex.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFoodItem = () => {
  const value = useContext(StoreContex);
  return value;
};

export default StoreContexProvider;
