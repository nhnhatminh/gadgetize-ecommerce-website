import React, { useState, useContext } from "react";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Shop/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Auth from "./pages/Auth/Auth";
import AdminLayout from "./pages/Admin/AdminLayout";
import { AuthContext } from "./context/AuthContext";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);
  const { user, loading } = useContext(AuthContext);

  const navigateToPage = (page, slug = null) => {
    if (slug) {
      setSelectedProductSlug(slug);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    if (loading) {
      return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading session...</span>
          </div>
        </div>
      );
    }

    if (currentPage.startsWith("admin-")) {
      if (!user || user.role !== "admin") {
        return <Home navigate={navigateToPage} />;
      }

      return (
        <AdminLayout navigate={navigateToPage} currentPage={currentPage}>
          {currentPage === "admin-dashboard" && (
            <div className="bg-white p-4 rounded-4 shadow-sm border border-light-subtle">
              <h4 className="fw-bold text-dark mb-2">Tổng Quan Hệ Thống</h4>
              <p className="text-muted mb-0">
                Hạ tầng khung vỏ quản trị đã thiết lập thành công. Sẵn sàng nạp
                dữ liệu ma trận.
              </p>
            </div>
          )}
          {currentPage === "admin-products" && <AdminProducts />}
          {currentPage === "admin-orders" && <AdminOrders />}
        </AdminLayout>
      );
    }

    switch (currentPage) {
      case "home":
        return <Home navigate={navigateToPage} />;
      case "products":
        return <Products navigate={navigateToPage} />;
      case "product-detail":
        return (
          <ProductDetail
            navigate={navigateToPage}
            productSlug={selectedProductSlug}
          />
        );
      case "cart":
        return <Cart navigate={navigateToPage} />;
      case "checkout":
        return <Checkout navigate={navigateToPage} />;
      case "auth":
        return <Auth navigate={navigateToPage} />;
      default:
        return <Home navigate={navigateToPage} />;
    }
  };

  const isAdminPage = currentPage.startsWith("admin-");

  return (
    <div className="app-container">
      {!isAdminPage && currentPage !== "checkout" && (
        <Header navigate={navigateToPage} currentPage={currentPage} />
      )}
      <main>{renderPage()}</main>
      {!isAdminPage && currentPage !== "checkout" && (
        <Footer navigate={navigateToPage} />
      )}
    </div>
  );
}
