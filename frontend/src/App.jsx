import React, { useState } from "react";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home/Home";
import Products from "./pages/Shop/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Auth from "./pages/Auth/Auth";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductSlug, setSelectedProductSlug] = useState(null);

  const navigateToPage = (page, slug = null) => {
    if (slug) {
      setSelectedProductSlug(slug);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
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

  return (
    <div className="app-container">
      {currentPage !== "checkout" && (
        <Header navigate={navigateToPage} currentPage={currentPage} />
      )}
      <main>{renderPage()}</main>
      {currentPage !== "checkout" && <Footer navigate={navigateToPage} />}
    </div>
  );
}
