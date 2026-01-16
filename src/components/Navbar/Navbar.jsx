import { useState } from "react";
import { assets } from "@/Assets/assets";
import { Button } from "../ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartItem } from "@/Contex/CartContext";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/Contex/AuthContext";
import SearchModal from "./SearchModal";

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount } = useCartItem();
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex justify-between items-center py-5 ">
      <SearchModal show={show} setShow={setShow} />
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo_img"
          className="w-[100px] lg:w-[150px] "
        />
      </Link>

      {!["/login", "/admin", "/signup"].some((path) =>
        currentPath.includes(path)
      ) && (
        <>
          <ul className="lg:flex gap-4 text-textColor hidden">
            <Link
              to="/"
              className={`cursor-pointer text-[18px] ${
                menu === "Home" ? "border-b-2 border-textColor" : ""
              }`}
              onClick={() => setMenu("Home")}
            >
              Home
            </Link>

            <a
              href="#menu"
              className={`cursor-pointer text-[18px] ${
                menu === "Menu" ? "border-b-2 border-textColor" : ""
              }`}
              onClick={() => setMenu("Menu")}
            >
              Menu
            </a>

            <a
              href="#mobile_app"
              className={`cursor-pointer text-[18px] ${
                menu === "Mobile app" ? "border-b-2 border-textColor" : ""
              }`}
              onClick={() => setMenu("Mobile app")}
            >
              Mobile app
            </a>

            <a
              href="#footer"
              className={`cursor-pointer text-[18px] ${
                menu === "Contact Us" ? "border-b-2 border-textColor" : ""
              }`}
              onClick={() => setMenu("Contact Us")}
            >
              Contact Us
            </a>
          </ul>

          <div className="flex items-center lg:gap-10 md:gap-6 sm:gap-4 gap-2">
            <img
              onClick={() => setShow(true)}
              src={assets.search_icon}
              className="cursor-pointer"
              alt=""
            />

            <div className="relative">
              <Link to="/cart">
                <img
                  src={assets.basket_icon}
                  className="cursor-pointer"
                  alt=""
                />
              </Link>
              {getTotalCartAmount() > 0 && (
                <div className="absolute -top-2 -right-1 w-[10px] h-[10px] bg-tomato rounded-full"></div>
              )}
            </div>
            {!user?.email && (
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                size="sm"
              >
                Sign-in
              </Button>
            )}

            {user?.email && <ProfileDropdown />}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
