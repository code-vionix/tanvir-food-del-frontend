/* eslint-disable react/prop-types */
import { assets } from "@/Assets/assets";
import { useCartItem } from "@/Contex/CartContext";

const FoodCartMini = ({ id }) => {
  const { cartItem, addToCart, removeToCart, loading } = useCartItem();
  if (loading) return null;
  const qty = cartItem[id] || 0;

  console.log(cartItem["6966c12027cdcd64d968bd18"]);

  return (
    <div
      className="absolute right-2 bottom-3 bg-white rounded-full p-1"
      onClick={(e) => e.stopPropagation()} // 👈 MOST IMPORTANT
    >
      {qty === 0 ? (
        <img
          src={assets.add_icon_white}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(id);
          }}
          className="cursor-pointer ring-1 ring-orange-500 rounded-full"
        />
      ) : (
        <div className="flex items-center gap-3">
          <img
            src={assets.remove_icon_red}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              removeToCart(id);
            }}
          />

          <p className="text-xl text-black">{qty}</p>

          <img
            src={assets.add_icon_green}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(id);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FoodCartMini;
