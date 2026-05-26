import React, { useState } from "react";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Auth from "./pages/Auth";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home navigate={setCurrentPage} />;
      case "products":
        return <Products navigate={setCurrentPage} />;
      case "product-detail":
        return <ProductDetail navigate={setCurrentPage} />;
      case "cart":
        return <Cart navigate={setCurrentPage} />;
      case "checkout":
        return <Checkout navigate={setCurrentPage} />;
      case "auth":
        return <Auth navigate={setCurrentPage} />;
      default:
        return <Home navigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      {currentPage !== "checkout" && (
        <Header navigate={setCurrentPage} currentPage={currentPage} />
      )}
      <main>{renderPage()}</main>
      {currentPage !== "checkout" && <Footer navigate={setCurrentPage} />}
    </div>
  );
}
