import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LiveSearchDropdown from "./LiveSearchDropdown";
import { useAuth } from "../../context/useAuth";
import { useCart } from "../../context/CartContext";
import { productApi } from "../../api/productApi";
import "../../styles/components/header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (!value.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) return;
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectSearchItem = (slug) => {
    setShowDropdown(false);
    setSearchQuery("");
    navigate(`/product/${slug}`);
  };

  const totalCartQuantity = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalCartPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.final_unit_price || 0) * item.quantity,
    0
  );

  const handleLogout = () => {
    setIsUserDropdownOpen(false);
    logout();
    navigate("/auth");
  };

  const handleNavigateProfileTab = (tab = "info") => {
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate(`/profile?tab=${tab}`);
  };

  return (
    <header className="site-header">
      <div className="header-topbar">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p className="header-topbar-text">
                Chào mừng đến với Cửa Hàng Điện Tử Gadgetize
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="header-middle">
        <div className="container">
          <div className="row header-middle-row">
            <div className="col-xl-3 col-lg-3 col-md-4 col-6">
              <div className="header-logo" onClick={() => navigate("/")}>
                <img src="/images/logo.png" alt="Gadgetize Logo" />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 d-none d-lg-block">
              <form
                className="header-search-form"
                ref={searchRef}
                onSubmit={handleSearchSubmit}
              >
                <div className="header-search-category">
                  Tất cả danh mục <i className="fa-solid fa-angle-down"></i>
                </div>
                <input
                  type="text"
                  className="header-search-input"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => {
                    if (searchResults.length > 0) setShowDropdown(true);
                  }}
                />
                <button type="submit" className="header-search-button">
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

            <div className="col-xl-3 col-lg-3 col-md-8 col-6">
              <div className="header-actions-wrapper">
                {user?.role === "admin" && (
                  <div
                    className="header-action-item header-action-item--admin d-none d-sm-flex"
                    onClick={() => navigate("/admin")}
                  >
                    <div className="header-action-icon">
                      <i className="fa-solid fa-user-gear"></i>
                    </div>
                    <div className="header-action-text">
                      <span>Hệ thống</span>
                      <strong>Quản trị</strong>
                    </div>
                  </div>
                )}

                <div
                  className="header-action-item header-user-action-wrapper d-none d-sm-flex"
                  ref={userDropdownRef}
                >
                  <div
                    className="header-user-trigger"
                    onClick={() => {
                      if (user) {
                        setIsUserDropdownOpen(!isUserDropdownOpen);
                      } else {
                        navigate("/auth");
                      }
                    }}
                  >
                    <div className="header-action-icon">
                      <i className="fa-regular fa-user"></i>
                    </div>
                    <div className="header-action-text">
                      <span>{user ? `Hi, ${user.firstName}` : "Đăng nhập"}</span>
                      <strong>{user ? "Tài khoản" : "Đăng nhập"}</strong>
                    </div>
                  </div>

                  {user && isUserDropdownOpen && (
                    <div className="header-user-dropdown">
                      <div
                        className="user-dropdown-item"
                        onClick={() => handleNavigateProfileTab("info")}
                      >
                        <i className="fa-regular fa-id-card"></i>
                        <span>Thông tin cá nhân</span>
                      </div>
                      <div
                        className="user-dropdown-item"
                        onClick={() => handleNavigateProfileTab("orders")}
                      >
                        <i className="fa-solid fa-box-archive"></i>
                        <span>Đơn hàng của tôi</span>
                      </div>
                      <div
                        className="user-dropdown-item"
                        onClick={() => handleNavigateProfileTab("notifications")}
                      >
                        <i className="fa-regular fa-bell"></i>
                        <span>Thông báo hệ thống</span>
                      </div>
                      <div className="user-dropdown-divider"></div>
                      <div
                        className="user-dropdown-item user-dropdown-item--logout"
                        onClick={handleLogout}
                      >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Đăng xuất</span>
                      </div>
                    </div>
                  )}
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
      </div>

      <div className="header-bottom d-none d-lg-block">
        <div className="container header-bottom-container">
          <div className="row header-bottom-row">
            <div className="col-xl-3 col-lg-3">
              <div
                className="nav-category-button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <i className="fa-solid fa-bars"></i>
                <span>Tất Cả Danh Mục</span>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6">
              <ul className="nav-menu-list">
                <li>
                  <span
                    className={`nav-menu-link ${
                      currentPath === "/" ? "nav-menu-link--active" : ""
                    }`}
                    onClick={() => navigate("/")}
                  >
                    Trang chủ
                  </span>
                </li>
                <li>
                  <span
                    className={`nav-menu-link ${
                      currentPath === "/shop" ? "nav-menu-link--active" : ""
                    }`}
                    onClick={() => navigate("/shop")}
                  >
                    Sản phẩm <i className="fa-solid fa-angle-down"></i>
                  </span>
                </li>
                <li>
                  <span className="nav-menu-link">
                    Blog <i className="fa-solid fa-angle-down"></i>
                  </span>
                </li>
                <li>
                  <span className="nav-menu-link">
                    Trang <i className="fa-solid fa-angle-down"></i>
                  </span>
                </li>
                <li>
                  <span className="nav-menu-link">
                    Cửa hàng <i className="fa-solid fa-angle-down"></i>
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-xl-3 col-lg-3">
              <div className="nav-promo-banner">
                <i className="fa-solid fa-certificate"></i>{" "}
                <span>Ưu Đãi 500.000đ Đơn Đầu Tiên.</span>
              </div>
            </div>
          </div>

          {isCategoryOpen && (
            <div className="category-dropdown-panel">
              <ul className="category-dropdown-list">
                <li className="category-dropdown-item">Laptop & Máy Tính</li>
                <li className="category-dropdown-item">
                  Smartphone & Máy Tính Bảng
                </li>
                <li className="category-dropdown-item">Tai Nghe & Loa</li>
                <li className="category-dropdown-item category-dropdown-item--last">
                  Bàn Phím & Chuột
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div
        className={`slide-in-menu ${
          isMobileMenuOpen ? "slide-in-menu--active" : ""
        }`}
      >
        <div className="slide-in-menu-container">
          <div className="slide-in-menu-header">
            <h5 className="slide-in-menu-title">Menu</h5>
            <button
              className="slide-in-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <ul className="slide-in-menu-list">
            <li
              className="slide-in-menu-item"
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }}
            >
              Trang chủ
            </li>
            <li
              className="slide-in-menu-item"
              onClick={() => {
                navigate("/shop");
                setIsMobileMenuOpen(false);
              }}
            >
              Sản phẩm
            </li>
            <li
              className="slide-in-menu-item"
              onClick={() => {
                navigate("/cart");
                setIsMobileMenuOpen(false);
              }}
            >
              Giỏ hàng
            </li>

            {user ? (
              <>
                <li
                  className="slide-in-menu-item slide-in-menu-item--highlight"
                  onClick={() => handleNavigateProfileTab("info")}
                >
                  Thông tin cá nhân
                </li>
                <li
                  className="slide-in-menu-item slide-in-menu-item--highlight"
                  onClick={() => handleNavigateProfileTab("orders")}
                >
                  Đơn hàng của tôi
                </li>
                <li
                  className="slide-in-menu-item slide-in-menu-item--highlight"
                  onClick={() => handleNavigateProfileTab("notifications")}
                >
                  Thông báo hệ thống
                </li>
                <li className="slide-in-menu-item" onClick={handleLogout}>
                  Đăng xuất ({user.firstName})
                </li>
              </>
            ) : (
              <li
                className="slide-in-menu-item"
                onClick={() => {
                  navigate("/auth");
                  setIsMobileMenuOpen(false);
                }}
              >
                Tài khoản / Đăng nhập
              </li>
            )}

            {user?.role === "admin" && (
              <li
                className="slide-in-menu-item slide-in-menu-item--admin"
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