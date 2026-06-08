import React, { useState, useEffect, useRef, useContext } from "react";
import LiveSearchDropdown from "./LiveSearchDropdown";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import "../../styles/components/header.css";

export default function Header({ navigate, currentPage }) {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const sampleProducts = [
    {
      id: 1,
      name: "Tai Nghe Razer Electra",
      image: "/images/pr-1.png",
      newPrice: 1200000,
    },
    {
      id: 2,
      name: "Chuột Hyper Glide",
      image: "/images/pr-2.png",
      newPrice: 2450000,
    },
    {
      id: 3,
      name: "Màn Hình LCD Radiant View",
      image: "/images/pr-3.png",
      newPrice: 22500000,
    },
    {
      id: 4,
      name: "Laptop Gaming Nitro 5",
      image: "/images/pr-4.png",
      newPrice: 17000000,
    },
    {
      id: 5,
      name: "Điện thoại iPhone 14 Pro Max",
      image: "/images/pr-5.png",
      newPrice: 17500000,
    },
  ];

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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowDropdown(value.trim() !== "");
  };

  const filteredProducts = sampleProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalCartQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.final_unit_price) * item.quantity,
    0,
  );

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
                onClick={() => navigate("home")}
              >
                <img src="/images/logo.png" alt="Gadgetize Logo" />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 d-none d-lg-block">
              <div className="header-search" ref={searchRef}>
                <div className="header-search-category">
                  Tất cả danh mục{" "}
                  <i className="fa-solid fa-angle-down ms-1"></i>
                </div>
                <input
                  type="text"
                  className="header-search-input"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if (searchQuery.trim() !== "") {
                      setShowDropdown(true);
                    }
                  }}
                />
                <button className="header-search-btn">Tìm kiếm</button>

                <LiveSearchDropdown
                  products={filteredProducts}
                  isOpen={showDropdown}
                />
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-8 col-6 d-flex justify-content-end align-items-center gap-4">
              <div
                className="header-action-item d-none d-sm-flex"
                onClick={() => (user ? logout() : navigate("auth"))}
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
                onClick={() => navigate("cart")}
              >
                <div className="header-action-icon">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="header-action-badge">
                    {totalCartQuantity}
                  </span>
                </div>
                <div className="header-action-text d-none d-sm-block">
                  <span>Giỏ hàng</span>
                  <strong>{totalCartPrice.toLocaleString()} VND</strong>
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
                    className={`cursor-pointer fw-medium ${currentPage === "home" ? "text-success" : ""}`}
                    onClick={() => navigate("home")}
                  >
                    Trang chủ
                  </span>
                </li>
                <li>
                  <span
                    className={`cursor-pointer fw-medium ${currentPage === "products" ? "text-success" : ""}`}
                    onClick={() => navigate("products")}
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
                navigate("home");
                setIsMobileMenuOpen(false);
              }}
            >
              Trang chủ
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("products");
                setIsMobileMenuOpen(false);
              }}
            >
              Sản phẩm
            </li>
            <li className="cursor-pointer">Blog</li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("cart");
                setIsMobileMenuOpen(false);
              }}
            >
              Giỏ hàng
            </li>
            <li
              className="cursor-pointer"
              onClick={() => {
                navigate("auth");
                setIsMobileMenuOpen(false);
              }}
            >
              Tài khoản
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
