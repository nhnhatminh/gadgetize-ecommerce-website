import React, { useState, useContext } from "react";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Shop/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Auth from "./pages/Auth/Auth";
import { AuthContext } from "./context/AuthContext";

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

      switch (currentPage) {
        case "admin-dashboard":
          return (
            <div className="container py-5">
              <h2 className="fw-bold text-dark">Admin Dashboard Placeholder</h2>
              <p className="text-muted">
                Security gate verified. Welcome, Administrator.
              </p>
              <button
                className="btn btn-danger mt-3"
                onClick={() => navigateToPage("home")}
              >
                Back to Customer View
              </button>
            </div>
          );
        default:
          return <Home navigate={navigateToPage} />;
      }
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
