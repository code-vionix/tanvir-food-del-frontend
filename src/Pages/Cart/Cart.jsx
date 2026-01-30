import { useCartItem } from "@/Contex/CartContext";
import { useFoodItem } from "@/Contex/StoreContex";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list } = useFoodItem();
  const { cartItem, removeToCart, getTotalCartAmount } = useCartItem();
  const navigate = useNavigate();

  return (
    <div className="mt-10">
      <div>
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr]">
          <p className="text-xs sm:text-sm">Item</p>
          <p className="text-xs sm:text-sm">Tittle</p>
          <p className="text-xs sm:text-sm">Price</p>
          <p className="text-xs sm:text-sm">Quantity</p>
          <p className="text-xs sm:text-sm">Total</p>
          <p className="text-tomato">❌</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItem[item._id]) {
            return (
              <div key={item._id}>
                <div className="grid mt-5 grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr]">
                  <img
                    className="sm:w-14 w-12 mr-1 sm:mr-0"
                    src={item.image}
                    alt=""
                  />
                  <p className="text-xs sm:text-sm">{item.name}</p>
                  <p className="text-xs sm:text-sm">${item.price}</p>
                  <p className="text-xs sm:text-sm">{cartItem[item._id]}</p>
                  <p className="text-xs sm:text-sm">
                    ${item.price * cartItem[item._id]}
                  </p>
                  <p
                    className="cursor-pointer"
                    onClick={() => removeToCart(item._id)}
                  >
                    ❌
                  </p>
                </div>
                <hr className="my-5" />
              </div>
            );
          }
        })}
      </div>
      <div className="flex flex-col md:flex-row  md:justify-between mt-20 gap-[max(12vw,20px)]">
        <div className="flex-[1] order-2 md:order-1">
          <h1 className="text-2xl text-black font-semibold mb-4">
            Cart Totals
          </h1>
          <div className="flex justify-between">
            <h3 className="text-sm text-[#171717] ">Subtotal</h3>
            <p className="text-sm text-[#171717] ">${getTotalCartAmount()}</p>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between">
            <h3 className="text-sm text-[#171717] ">Delivery Fee</h3>
            <p className="text-sm text-[#171717] ">
              ${getTotalCartAmount() > 0 ? 2 : 0}
            </p>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between">
            <h3 className="text-black font-medium text-lg">Total</h3>
            <p className="text-black font-medium text-lg">
              ${getTotalCartAmount() > 0 ? getTotalCartAmount() + 2 : 0}
            </p>
          </div>

          {getTotalCartAmount() > 1 && (
            <button
              onClick={() => navigate("/placeorder")}
              className="bg-tomato px-5 mt-4 py-3 text-white text-sm rounded transition duration-300 ease-in-out hover:bg-[#f3493d]"
            >
              PROCEED TO CHECKOUT
            </button>
          )}
        </div>
        <div className="flex-[1] order-1 md:order-2">
          <div>
            <p className="text-sm text-[#171717] ">
              If you have a promo code, enter here.
            </p>
            <div className="bg-[#eaeaea] mt-2 rounded flex justify-between">
              <input
                className="bg-transparent border-none outline-none px-4 md:flex-[1] w-full "
                type="text"
                placeholder="Promo code"
              />
              <button
                type="submit"
                className="bg-tomato h-10 rounded px-5  text-white transition duration-300 ease-in-out hover:bg-[#f3493d]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
