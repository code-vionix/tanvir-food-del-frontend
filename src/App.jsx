import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Layout from "./Pages/admin/_components/Layout";
import AddItemPage from "./Pages/admin/add/AddItemPage";
import ListsPage from "./Pages/admin/lists/ListsPage";
import OrdersPage from "./Pages/admin/order/OrdersPage";
import FoodDetailsPage from "./Pages/foodDetails/FoodDetailsPage";
import LoginPage from "./Pages/login/LoginPage";
import SignUpPage from "./Pages/signUp/SignUpPage";

// Admin Components
// import Layout from "./admin/Layout";
// import AddItem from "./admin/AddItem";
// import ListItems from "./admin/ListItems";
// import Orders from "./admin/Orders";

function App() {
  return (
    <div className="app">
      {/* 1. Navbar stays at the top */}
      <div className="w-5/6 mx-auto">
        <Navbar />
      </div>

      <Routes>
        {/* 2. USER ROUTES */}
        <Route
          path="/"
          element={
            <div className="w-5/6 mx-auto">
              <Home />
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div className="w-5/6 mx-auto">
              <Cart />
            </div>
          }
        />
        <Route
          path="/placeorder"
          element={
            <div className="w-5/6 mx-auto">
              <PlaceOrder />
            </div>
          }
        />
        <Route
          path="/details/:id"
          element={
            <div className="w-5/6 mx-auto">
              <FoodDetailsPage />
            </div>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* 3. ADMIN SECTION (Full Width Layout) */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Navigate to="add" />} />
          <Route path="add" element={<AddItemPage />} />
          <Route path="list" element={<ListsPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
