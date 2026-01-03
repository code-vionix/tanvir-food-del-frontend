const ListsPage = () => {
  // Mock data (In MERN, you'd fetch this from MongoDB)
  const list = [
    {
      id: 1,
      name: "Greek Salad",
      price: 12,
      category: "Salad",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      name: "Veg Salad",
      price: 18,
      category: "Salad",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-gray-600">All Foods List</p>
      <div className="overflow-x-auto">
        <div className="hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-3 py-3 px-4 border border-gray-300 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-3 py-3 px-4 border border-gray-300 text-sm mt-2"
          >
            <img
              src={item.image}
              alt=""
              className="w-12 h-12 rounded shadow-sm"
            />
            <p>{item.name}</p>
            <p className="hidden md:block">{item.category}</p>
            <p>${item.price}</p>
            <p className="cursor-pointer text-red-500 font-bold px-2 hover:scale-110 transition-all">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListsPage;
