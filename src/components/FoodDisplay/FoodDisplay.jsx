import { useFoodItem } from "@/Contex/StoreContex";
import FoodItems from "../FoodItems/FoodItems";

const FoodDisplay = ({ category }) => {
  const { food_list } = useFoodItem();

  return (
    <div className="flex justify-center md:block">
      <div>
        <h1 className="mt-4 text-[max(2vw,24px)] font-semibold">
          Top dishes near you
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))] mt-8 gap-7 gap-y-12 items-center content-center">
          {food_list.map((item) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItems
                  key={Math.random()}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
