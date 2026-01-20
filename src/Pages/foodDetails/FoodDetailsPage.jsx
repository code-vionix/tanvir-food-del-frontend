import { useEffect, useState } from "react";
import {
  Star,
  Clock,
  Flame,
  Leaf,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useFoodItem } from "@/Contex/StoreContex";
import { useCartItem } from "@/Contex/CartContext";
import FoodCartMini from "@/components/FoodDisplay/FoodCartMini";
import { useAuth } from "@/Contex/AuthContext";

const FoodDetailsPage = () => {
  const { food_list } = useFoodItem();
  const [foodData, setFoodData] = useState({});
  const { addToCart, cartItem } = useCartItem();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const foodDatat = {
    name: "Mediterranean Quinoa Salad",
    price: 18.5,
    rating: 4.8,
    reviews: 124,
    description:
      "A refreshing blend of organic quinoa, crisp cucumbers, cherry tomatoes, and feta cheese, drizzled with our signature lemon-herb vinaigrette. Perfect for a light yet protein-packed lunch.",
    calories: "420 kcal",
    prepTime: "15-20 min",
    isVegan: false,
    ingredients: [
      { id: 1, name: "Organic Quinoa" },
      { id: 2, name: "Cherry Tomatoes" },
      { id: 3, name: "Feta Cheese" },
      { id: 4, name: "Fresh Parsley" },
      { id: 5, name: "English Cucumber" },
    ],
  };

  useEffect(() => {
    const foodData = food_list.find((f) => f._id === id);
    setFoodData(foodData);
  }, [food_list, id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  const handleCart = async () => {
    if (!user) {
      navigate("/login");
    } else if (!cartItem || Object.keys(cartItem).length === 0) {
      await addToCart(foodData?._id);
      navigate("/cart");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white/60">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: Hero Image with Gradient */}
        <div className="relative group overflow-hidden rounded-3xl shadow-2xl h-[400px] md:h-[600px]">
          <img
            src={foodData?.image}
            alt={foodData?.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          {/* Badges on Image */}
          <div className="absolute bottom-6 left-6 flex gap-3">
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
              <Clock size={16} /> {foodData?.prepTime}
            </span>
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium border border-white/30">
              <Flame size={16} /> {foodData?.calories}
            </span>
          </div>
        </div>

        {/* RIGHT: Content Section */}
        <div className="flex flex-col gap-6">
          {/* Header Info */}
          <div>
            <div className="flex flex-col gap-3 justify-between items-start">
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                {foodData?.name}
              </h1>

              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-lg">
                <Star className="text-orange-500 fill-orange-500" size={18} />

                <span className="font-bold text-orange-700">
                  {foodData?.rating}
                  <span className="text-gray-500 ml-4 bg-transparent">
                    ({Math.round(Math.random() * 500)}) Verified Customer
                    Reviews
                  </span>
                </span>
              </div>
            </div>
          </div>

          <p className="text-2xl font-bold text-orange-600">
            ${foodData?.price?.toFixed(2)}
          </p>

          <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-orange-500 pl-4">
            {foodData?.description}
          </p>

          {/* Ingredients Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Leaf className="text-green-600" /> Key Ingredients
            </h3>
            <div className="flex flex-wrap gap-3">
              {foodData?.ingredients?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 hover:border-orange-300 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {item?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Quantity & Add to Cart */}
          <div className="relative inline-flex">
            {/* Mini Cart Badge */}
            <div className="absolute left-56 -top-4 w-20 h-20 rounded-full items-center justify-center">
              <FoodCartMini id={foodData?._id} />
            </div>

            {/* Main Button */}
            <Button
              onClick={handleCart}
              className="flex items-center h-12 px-6 md:px-8 bg-orange-500 font-semibold rounded-full shadow-glow hover:scale-105 hover:bg-orange-600 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Trust Factor */}
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle2 size={16} />
            <span>Prepared fresh upon order. High hygiene standards.</span>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-16 border-t pt-10">
        <h2 className="text-2xl font-bold mb-8 italic">
          What people are saying
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-2xl border border-gray-100"
            >
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={14}
                    className="fill-orange-500 text-orange-500"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic font-medium mb-4">
                "Absolutely loved the freshness! The lemon vinaigrette is to die
                for. Will definitely order again."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center font-bold text-orange-700">
                  JS
                </div>
                <div>
                  <p className="text-sm font-bold">John Smith</p>
                  <p className="text-xs text-gray-400">2 days ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDetailsPage;
