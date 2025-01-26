import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "./redux/slices/profileSlice";
import Navbar from "./components/utils/Navbar";
import Register from "./pages/auth/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailsPage from "./pages/products/ProductDetailsPage";
import CartPage from "./pages/cart/CartPage";
import OrdersPage from "./pages/orders/OrdersPage";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/DashboardAdmin";
import ProductsAdmin from "./pages/admin/ProductsAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import UserProtect from "./components/protectsRoutes/UserProtect";

const App = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserProfileThunk(accessToken));
  }, [dispatch]);
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        {/* user routes */}
        <Route element={<UserProtect />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>

        {/* admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route index element={<OrdersAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
