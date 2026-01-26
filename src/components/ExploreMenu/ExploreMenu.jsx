import { menu_list } from "../../Assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <>
      <div className="lg:mt-10 mt-4" id="menu">
        <h1 className="sm:text-3xl text-xl font-medium">Explore our menu</h1>
        <p className="text-sm text-textColor md:max-w-[60%]  mt-2">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your dining
          experience. One delicious meal at a time.
          <br />
          <span className="text-black font-semibold text-xs ">
            Duble click for all menu.
          </span>
        </p>
        <dir className="flex justify-between gap-[30px] text-center my-[30px] items-center overflow-x-scroll lg:overflow-auto">
          {menu_list.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name,
                )
              }
            >
              <img
                src={item.menu_image}
                className={`w-[7.5vw] max-w-20 cursor-pointer rounded-[50%] transition-all duration-200 ${
                  category === item.menu_name
                    ? "border-[3px] border-tomato p-[2px]"
                    : ""
                }`}
                alt=""
              />
              <p className="text-textColor text-base cursor-pointer mt-3">
                {item.menu_name}
              </p>
            </div>
          ))}
        </dir>
      </div>
      <hr className="my-10" />
    </>
  );
};

export default ExploreMenu;
