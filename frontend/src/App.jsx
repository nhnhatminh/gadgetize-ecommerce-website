import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ClientLayout from "./components/shared/ClientLayout";
import AdminLayout from "./pages/Admin/AdminLayout";
import Home from "./pages/Home/Home";
import Products from "./pages/Shop/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Auth from "./pages/Auth/Auth";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";
import Profile from "./pages/Profile/Profile";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

export default function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="app-loading-screen">
        <div className="app-loading-spinner" role="status">
          <span className="app-loading-text">Loading session...</span>
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

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/checkout"
        element={
          user ? <Checkout /> : <Navigate to="/auth" replace />
        }
      />

      <Route
        path="/admin"
        element={
          user && user.role === "admin" ? (
            <AdminLayout />
          ) : (
            <Navigate to="/admin/login" replace />
          )
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/auth" replace />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}