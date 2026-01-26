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
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./Contex/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MyOrders from "./Pages/myorder/MyOrdersPage";
import PaymentSuccess from "./Pages/payment-success/PaymentSuccess";

function App() {
  const { user } = useAuth(); // user = { role: "admin" / "user" }

  return (
    <div className="app">
      <div className="w-5/6 mx-auto">
        <Navbar />
      </div>

      <Routes>
        {/* USER ROUTES */}
        <Route
          path="/"
          element={
            <div className="w-5/6 mx-auto">
              {" "}
              <Home />{" "}
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div className="w-5/6 mx-auto">
              {" "}
              <Cart />{" "}
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
          path="/myorders"
          element={
            <div className="w-5/6 mx-auto">
              <MyOrders />
            </div>
          }
        />
        <Route
          path="/details/:id"
          element={
            <div className="w-5/6 mx-auto">
              {" "}
              <FoodDetailsPage />{" "}
            </div>
          }
        />
        <Route
          path="/payment-success"
          element={
            <div className="w-5/6 mx-auto">
              <PaymentSuccess />
            </div>
          }
        />

        {/* AUTH ROUTES */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="add" />} />
          <Route path="add" element={<AddItemPage />} />
          <Route path="list" element={<ListsPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
      <Footer />
    </div>
  );
}

export default App;
