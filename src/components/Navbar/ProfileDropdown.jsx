import { logoutUser } from "@/services/auth.service";
import { LogOut, Package, ShoppingCart } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logout Successfully!");
    navigate("/");
    setOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative">
      {/* ===== PROFILE IMAGE ===== */}
      <img
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full cursor-pointer border border-gray-200"
        src="https://hancockogundiyapartners.com/wp-content/uploads/2019/07/dummy-profile-pic-300x300.jpg"
        alt="profile"
      />

      {/* ===== DROPDOWN ===== */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg z-50 shadow-md">
          <div
            onClick={() => {
              navigate("/myorders");
              setOpen(!open);
            }}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          >
            <Package size={16} />
            <span>My Orders</span>
          </div>

          <div
            onClick={() => {
              navigate("/cart");
              setOpen(!open);
            }}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            <span>Cart</span>
          </div>

          <div className="border-t"></div>

          <div className="px-3 py-2 hover:bg-red-50 cursor-pointer flex items-center gap-2 text-red-500">
            <LogOut size={16} />
            <span onClick={handleLogout}>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
