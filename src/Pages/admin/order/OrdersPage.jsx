import { Box } from "lucide-react";

const OrdersPage = () => {
  const orders = [
    {
      items: "Greek salad x 2, Veg salad x 2",
      address: "Street, City, State, US, 125456",
      amount: 74,
      status: "Food Processing",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-gray-600">Orders Page</p>
      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-4 border border-orange-200 p-5 my-2 text-sm text-gray-700 bg-white shadow-sm"
          >
            <Box
              size={40}
              className="text-orange-500 bg-orange-50 p-1 rounded shadow-inner"
            />
            <div>
              <p className="font-semibold">{order.items}</p>
              <p className="mt-3 font-medium">Customer Name</p>
              <div className="text-xs text-gray-500 mt-1">
                <p>{order.address}</p>
                <p>9876543210</p>
              </div>
            </div>
            <p>Items: 4</p>
            <p className="font-bold text-black">${order.amount}</p>
            <select className="bg-[#fff0ed] border border-orange-300 p-2 outline-none rounded-sm font-medium">
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
