import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LiveSearchDropdown from "./LiveSearchDropdown";
import { useAuth } from "../../context/useAuth";
import { CartContext } from "../../context/CartContext";
import { productApi } from "../../api/productApi";
import "../../styles/components/header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

// State quản lý menu
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

// State quản lý Live Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

// Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

// Debounce tìm kiếm
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);
        const response = await productApi.searchProducts(searchQuery.trim());
        setSearchResults(response.products || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

// Tìm kiếm sản phẩm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

// Chọn sản phẩm từ gợi ý
  const handleSelectSearchItem = (slug) => {
    setShowDropdown(false);
    setSearchQuery("");
    navigate(`/product/${slug}`);
  };

// Tính tổng giỏ hàng
  const totalCartQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.final_unit_price || 0) * item.quantity,
    0
  );

// Đăng xuất
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <header className="bg-white site-header">
      <div className="header-topbar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="mb-0">
                Chào mừng đến với Cửa Hàng Điện Tử Gadgetize
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="header-middle">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-3 col-lg-3 col-md-4 col-6">
              <div
                className="header-logo cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img src="/images/logo.png" alt="Gadgetize Logo" />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 d-none d-lg-block">
              <form
                className="header-search"
                ref={searchRef}
                onSubmit={handleSearchSubmit}
              >
                <div className="header-search-category">
                  Tất cả danh mục{" "}
                  <i className="fa-solid fa-angle-down ms-1"></i>
                </div>
                <input
                  type="text"
                  className="header-search-input"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0) setShowDropdown(true);
                  }}
                />
                <button type="submit" className="header-search-btn">
                  {isSearching ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    "Tìm kiếm"
                  )}
                </button>

                <LiveSearchDropdown
                  products={searchResults}
                  isOpen={showDropdown}
                  onItemClick={handleSelectSearchItem}
                />
              </form>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-8 col-6 d-flex justify-content-end align-items-center gap-3">
              {user?.role === "admin" && (
                <div
                  className="header-action-item d-none d-sm-flex text-success"
                  onClick={() => navigate("/admin")}
                >
                  <div className="header-action-icon text-success">
                    <i className="fa-solid fa-user-gear"></i>
                  </div>
                  <div className="header-action-text">
                    <span className="text-success">Hệ thống</span>
                    <strong className="text-success">Quản trị</strong>
                  </div>
                </div>
              )}

              <div
                className="header-action-item d-none d-sm-flex"
                onClick={() => (user ? handleLogout() : navigate("/auth"))}
              >
                <div className="header-action-icon">
                  <i className="fa-regular fa-user"></i>
                </div>
                <div className="header-action-text">
                  <span>{user ? `Hi, ${user.firstName}` : "Đăng nhập"}</span>
                  <strong>{user ? "Đăng xuất" : "Tài khoản"}</strong>
                </div>
              </div>

              <div className="header-action-item">
                <div className="header-action-icon">
                  <i className="fa-regular fa-heart"></i>
                  <span className="header-action-badge">0</span>
                </div>
              </div>

              <div
                className="header-action-item"
                onClick={() => navigate("/cart")}
              >
                <div className="header-action-icon">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="header-action-badge">
                    {totalCartQuantity}
                  </span>
                </div>
                <div className="header-action-text d-none d-sm-block">
                  <span>Giỏ hàng</span>
                  <strong>{totalCartPrice.toLocaleString("vi-VN")} VND</strong>
                </div>
              </div>

              <div
                className="header-action-item d-lg-none"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <div className="header-action-icon">
                  <i className="fa-solid fa-bars"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-bottom d-none d-lg-block">
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-xl-3 col-lg-3">
              <div
                className="nav-category-btn d-flex align-items-center"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <i className="fa-solid fa-bars me-2"></i>
                <span>Tất Cả Danh Mục</span>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <ul className="nav-menu">
                <li>
                  <span
                    className={`cursor-pointer fw-medium ${currentPath === "/" ? "text-success" : ""}`}
                    onClick={() => navigate("/")}
                  >
                    Trang chủ
                  </span>
                </li>
                <li>
                  <span
                    className={`cursor-pointer fw-medium ${currentPath === "/shop" ? "text-success" : ""}`}
                    onClick={() => navigate("/shop")}
                  >
                    Sản phẩm{" "}
                    <i className="fa-solid fa-angle-down ms-1 fs-7"></i>
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer fw-medium">
                    Blog <i className="fa-solid fa-angle-down ms-1 fs-7"></i>
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer fw-medium">
                    Trang <i className="fa-solid fa-angle-down ms-1 fs-7"></i>
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer fw-medium">
                    Cửa hàng{" "}
                    <i className="fa-solid fa-angle-down ms-1 fs-7"></i>
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-xl-3 col-lg-3 text-end">
              <div className="nav-promo">
                <i className="fa-solid fa-certificate"></i>{" "}
                <span>Ưu Đãi 500.000đ Đơn Đầu Tiên.</span>
              </div>
            </div>
          </div>

          {isCategoryOpen && (
            <div
              className="categories bg-white p-3 border position-absolute top-100 start-0 z-3 rounded-3 shadow-sm w-100"
              style={{ maxWidth: "300px" }}
            >
              <ul className="mb-0">
                <li className="py-2 border-bottom cursor-pointer">
                  Laptop & Máy Tính
                </li>
                <li className="py-2 border-bottom cursor-pointer">
                  Smartphone & Máy Tính Bảng
                </li>
                <li className="py-2 border-bottom cursor-pointer">
                  Tai Nghe & Loa
                </li>
                <li className="py-2 cursor-pointer">Bàn Phím & Chuột</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={`slide-in-menu ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="p-4 d-flex flex-column h-100">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">Menu</h5>
            <button
              className="btn border-0 p-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fa-solid fa-xmark fs-4"></i>
            </button>
          </div>
          <ul className="d-flex flex-column gap-3 fs-5">
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            >
              Trang chủ
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/shop");
                setIsMobileMenuOpen(false);
              }}
            >
              Sản phẩm
            </li>
            <li className="cursor-pointer">Blog</li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("/cart");
                setIsMobileMenuOpen(false);
              }}
            >
              Giỏ hàng
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                if (user) {
                  handleLogout();
                } else {
                  navigate("/auth");
                }
                setIsMobileMenuOpen(false);
              }}
            >
              {user ? `Đăng xuất (${user.firstName})` : "Tài khoản / Đăng nhập"}
            </li>
            {user?.role === "admin" && (
              <li
                className="cursor-pointer text-success fw-bold border-top pt-2"
                onClick={() => {
                  navigate("/admin");
                  setIsMobileMenuOpen(false);
                }}
              >
                Quản trị hệ thống
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}