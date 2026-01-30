import { assets } from "@/Assets/assets";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      id="footer"
      className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 pt-20 mt-20 px-[8vw] py-5 "
    >
      <div className="grid md:grid-cols-[2fr_1fr_1fr] md:gap-20 gap-8 ">
        <div className="flex flex-col gap-5">
          <div>
            <img src={assets.logo} alt="" />
          </div>
          <p>
            QuickBite is a fast and reliable food delivery platform that brings
            your favorite meals straight to your doorstep. Order easily, get
            fresh food, and enjoy quick delivery anytime, anywhere.
          </p>
          <div className="flex gap-4">
            <Link to="https://www.facebook.com/randomtanvir07">
              <img
                className="cursor-pointer transition-all hover:scale-105"
                src={assets.facebook_icon}
                alt=""
              />
            </Link>
            <img
              className="cursor-pointer transition-all hover:scale-105"
              src={assets.twitter_icon}
              alt=""
            />
            <img
              className="cursor-pointer transition-all hover:scale-105"
              src={assets.linkedin_icon}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="md:text-3xl text-xl text-white font-medium">
            COMPANY
          </h2>
          <ul className="flex flex-col gap-3">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About us</li>
            <li className="cursor-pointer">Delivery</li>
            <li className="cursor-pointer">Privacy Police</li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="md:text-3xl text-xl text-white font-medium">
            GET IN TOUCH
          </h2>
          <div>
            <p className="mb-3 cursor-pointer">+880 1639-528846</p>
            <p className="cursor-pointer">tanvir.info07@gmail.com</p>
          </div>
        </div>
        <hr className="my-4" />
      </div>
      <p className="p-6 text-center ">
        Copyright 2026 @ codevionix.quickbite.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
