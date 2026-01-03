import { NavLink } from "react-router-dom";
import { Box, CircleCheckBig, CirclePlus } from "lucide-react";

const Sidebar = () => {
  const activeStyle = "bg-[#fff0ed] border-orange-500 border-r-0";
  const idleStyle = "bg-white border-gray-300 border-r-0";

  const menuItems = [
    { path: "add", label: "Add Items", icon: <CirclePlus size={22} /> },
    { path: "list", label: "List Items", icon: <CircleCheckBig size={20} /> },
    { path: "orders", label: "Orders", icon: <Box size={22} /> },
  ];

  return (
    <div className="w-[18%] min-h-screen border-r border-gray-300 pt-10 flex flex-col gap-4">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={`/admin/${item.path}`}
          className={({ isActive }) =>
            `flex items-center gap-3 border px-4 py-2 rounded-l-md cursor-pointer transition-all ml-auto w-[90%] font-medium ${
              isActive ? activeStyle : idleStyle
            }`
          }
        >
          {item.icon}
          <p className="hidden md:block">{item.label}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
