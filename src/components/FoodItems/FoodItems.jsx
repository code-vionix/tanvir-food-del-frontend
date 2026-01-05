import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { assets } from "@/Assets/assets";
import { useFoodItem } from "@/Contex/StoreContex";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const FoodItems = ({ id, name, image, price, description, category }) => {
  const { addToCart, cartItem, removeToCart } = useFoodItem();

  return (
    <div className="max-w-[300px]">
      <Card>
        <div className="relative">
          <img
            src={image}
            className="rounded-t-md mb-2 w-full transition-all hover:scale-105"
            alt=""
          />
          <div className="absolute right-2 bottom-3 bg-white rounded-full p-1">
            {!cartItem[id] ? (
              <img
                src={assets.add_icon_white}
                onClick={() => addToCart(id)}
                className="cursor-pointer"
              />
            ) : (
              <div className="flex items-center gap-3">
                <img
                  src={assets.remove_icon_red}
                  className="cursor-pointer"
                  onClick={() => removeToCart(id)}
                  alt=""
                />
                <p className="text-xl text-black">{cartItem[id]}</p>
                <img
                  src={assets.add_icon_green}
                  className="cursor-pointer"
                  onClick={() => addToCart(id)}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <CardHeader>
          <Link to={`/details/${id}`}>{name}</Link>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p className="text-xl">$ {price}</p>
          <div>
            <img src={assets.rating_starts} alt="" />
          </div>
        </CardContent>
        <CardFooter>
          <p>{category}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default FoodItems;
