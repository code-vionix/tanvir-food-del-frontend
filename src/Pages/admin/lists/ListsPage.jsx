import { useEffect, useState } from "react";
import { deleteFood, getAllFoods } from "@/services/food.service";
import toast from "react-hot-toast";

const ListsPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch all foods from backend
  const fetchFoods = async () => {
    try {
      const food = await getAllFoods();
      setList(food.foods || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = async (id) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) return;

    try {
      const res = await deleteFood(id);
      toast.success(res.message);
      console.log(res.message);

      fetchFoods();
    } catch (error) {
      toast.error("Failed to delete the item. Please try again.");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading foods...</p>;

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-gray-600">All Foods List</p>

      <div className="overflow-x-auto">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-3 py-3 px-4 border border-gray-300 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Table body */}
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-3 py-3 px-4 border border-gray-300 text-sm mt-2"
          >
            <img
              src={item.image || "https://via.placeholder.com/50"}
              alt={item.name}
              className="w-12 h-12 rounded shadow-sm"
            />
            <p>{item.name}</p>
            <p className="hidden md:block">{item.category}</p>
            <p>৳{item.price}</p>
            <p
              onClick={() => handleDelete(item._id)}
              className="cursor-pointer text-red-500 font-bold px-2 hover:scale-110 transition-all"
            >
              X
            </p>
          </div>
        ))}

        {list.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default ListsPage;
