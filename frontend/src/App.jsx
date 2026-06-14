import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ClientLayout from "./components/shared/ClientLayout";
import AdminLayout from "./pages/Admin/AdminLayout";
import Home from "./pages/Home/Home";
import Products from "./pages/Shop/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Auth from "./pages/Auth/Auth";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading session...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<ClientLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
      </Route>

      <Route path="/checkout" element={<Checkout />} />

      <Route
        path="/admin"
        element={
          user && user.role === "admin" ? (
            <AdminLayout />
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route
          index
          element={
            <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle">
              <h4 className="fw-bold text-dark mb-2">Tổng Quan Hệ Thống</h4>
              <p className="text-muted mb-0">
                Hạ tầng khung vỏ quản trị đã thiết lập thành công. Sẵn sàng nạp
                dữ liệu ma trận.
              </p>
            </div>
          }
        />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
