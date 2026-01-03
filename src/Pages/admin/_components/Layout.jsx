import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex border-t border-gray-300">
      <Sidebar />
      <div className="flex-grow p-8 bg-[#fcfcfc] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
